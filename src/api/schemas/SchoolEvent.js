import { toPersonSchema } from "./Person";

const colors = ["rosa", "verde", "laranja"];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}


function eventOriginByRole(roleName) {
  if (roleName === "TEACHER") { return "Professores" }
  else if (roleName == "ADMIN") { return "Diretoria" }
  else return "Coordenação"
}


export const toSchoolEventSchema = (data) => {
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
    eventType: data.eventTypeId,
    color: getRandomColor(),
    origin: origin
  };
};