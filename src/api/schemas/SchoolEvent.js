import { toPersonSchema } from "./Person";
import { roleNameMatches } from "./Role"; 
import { ROLE_NAME_ALIASES } from "../schemas/Role";
import { toSchoolEventTypeSchema } from "./SchoolEventType";

const colors = ["rosa", "verde", "laranja"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}


function eventOriginByRole(roleName) {
  if (roleNameMatches(roleName, ROLE_NAME_ALIASES.teacher)) { return "Professores" }
  else if (roleNameMatches(roleName, ROLE_NAME_ALIASES.admin)) { return "Diretoria" }
  else return null
}


export function toSchoolEventSchema(data) {
  if (!data) return null;

  const origin = eventOriginByRole(data.createdBy.roleName)

  return {
    id: data.eventId,
    name: data.name,
    description: data.description,
    eventDate: data.eventDate,
    createdBy: toPersonSchema(data.createdBy),
    createDate: data.createDate,
    updateDate: data.updateDate,
    eventType: toSchoolEventTypeSchema(data.eventType),
    color: getRandomColor(),
    origin: origin
  };
};