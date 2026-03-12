import { removeUndefinedFields, sanitizeCpf } from "../../util/objectUtil";

const normalizeEventDate = (value) => {
  if (!value) {
    return undefined;
  }

  const rawValue = String(value);
  const candidate = rawValue.includes("T") ? rawValue : `${rawValue}T00:00:00`;
  const parsedDate = new Date(candidate);

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return parsedDate.toISOString();
};

const normalizeEventTypeId = (value) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const parsedEventTypeId = Number(value);

  return Number.isNaN(parsedEventTypeId) ? undefined : parsedEventTypeId;
};

export const toSchoolEventRequest = (schoolEvent = {}) => {
  return removeUndefinedFields({
    name: schoolEvent.name ?? schoolEvent.titulo,
    description: schoolEvent.description ?? schoolEvent.descricao,
    eventDate: normalizeEventDate(schoolEvent.eventDate ?? schoolEvent.data),
    cpf: sanitizeCpf(schoolEvent.cpf),
    eventTypeId: normalizeEventTypeId(schoolEvent.eventTypeId),
  });
};