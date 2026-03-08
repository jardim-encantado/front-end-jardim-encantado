import { useCallback, useEffect, useState } from "react";
import { makePersonSchema } from "../api/schemas/Person";

const PERSON_STORAGE_KEY = "loggedPerson";
const PERSON_UPDATED_EVENT = "person-updated";

function readPersonFromStorage() {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const storedPerson = localStorage.getItem(PERSON_STORAGE_KEY);
		if (!storedPerson) {
			return null;
		}

		const parsedPerson = JSON.parse(storedPerson);
		return makePersonSchema(parsedPerson);
	} catch (error) {
		console.error("Error reading logged person from localStorage:", error);
		localStorage.removeItem(PERSON_STORAGE_KEY);
		return null;
	}
}

function notifyPersonUpdate() {
	window.dispatchEvent(new Event(PERSON_UPDATED_EVENT));
}

export function saveLoggedPerson(person) {
	if (typeof window === "undefined") {
		return;
	}

	const normalizedPerson = makePersonSchema(person);

	if (!normalizedPerson) {
		localStorage.removeItem(PERSON_STORAGE_KEY);
		notifyPersonUpdate();
		return;
	}

	localStorage.setItem(PERSON_STORAGE_KEY, JSON.stringify(normalizedPerson));
	notifyPersonUpdate();
}

export function clearLoggedPerson() {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.removeItem(PERSON_STORAGE_KEY);
	notifyPersonUpdate();
}

export function getLoggedPerson() {
	return readPersonFromStorage();
}

export function usePerson() {
	const [person, setPerson] = useState(() => readPersonFromStorage());

	const refreshPerson = useCallback(() => {
		setPerson(readPersonFromStorage());
	}, []);

	useEffect(() => {
		if (typeof window === "undefined") {
			return undefined;
		}

		const handleStorage = (event) => {
			if (event.key && event.key !== PERSON_STORAGE_KEY) {
				return;
			}

			refreshPerson();
		};

		window.addEventListener("storage", handleStorage);
		window.addEventListener(PERSON_UPDATED_EVENT, refreshPerson);

		return () => {
			window.removeEventListener("storage", handleStorage);
			window.removeEventListener(PERSON_UPDATED_EVENT, refreshPerson);
		};
	}, [refreshPerson]);

	const setLoggedPerson = useCallback((nextPerson) => {
		saveLoggedPerson(nextPerson);
		refreshPerson();
	}, [refreshPerson]);

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
