import { useState, useEffect, useCallback } from "react";
import { toPersonSchema } from "../api/schemas/Person";

const PERSON_STORAGE_KEY = "loggedPerson";
const PERSON_UPDATED_EVENT = "person-updated";

function readPersonFromStorage() {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(PERSON_STORAGE_KEY);
    if (!stored) return null;
    return toPersonSchema(JSON.parse(stored));
  } catch (e) {
    console.error("Error reading person from localStorage:", e);
    localStorage.removeItem(PERSON_STORAGE_KEY);
    return null;
  }
}

function notifyPersonUpdate() {
  window.dispatchEvent(new Event(PERSON_UPDATED_EVENT));
}

export function saveLoggedPerson(person) {
  if (typeof window === "undefined") return;
  const normalized = toPersonSchema(person);
  if (!normalized) {
    localStorage.removeItem(PERSON_STORAGE_KEY);
    notifyPersonUpdate();
    return;
  }
  localStorage.setItem(PERSON_STORAGE_KEY, JSON.stringify(normalized));
  notifyPersonUpdate();
}

export function clearLoggedPerson() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PERSON_STORAGE_KEY);
  notifyPersonUpdate();
}

export function usePerson() {
  const [person, setPerson] = useState(() => readPersonFromStorage());

  const refreshPerson = useCallback(() => {
    setPerson(readPersonFromStorage());
  }, []);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key && event.key !== PERSON_STORAGE_KEY) return;
      refreshPerson();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(PERSON_UPDATED_EVENT, refreshPerson);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(PERSON_UPDATED_EVENT, refreshPerson);
    };
  }, [refreshPerson]);

  const setLoggedPerson = useCallback(
    (nextPerson) => {
      saveLoggedPerson(nextPerson);
      refreshPerson();
    },
    [refreshPerson]
  );

  const removeLoggedPerson = useCallback(() => {
    clearLoggedPerson();
    setPerson(null);
  }, []);

  return {
    person,
    setLoggedPerson,
    removeLoggedPerson,
    refreshPerson,
  };
}