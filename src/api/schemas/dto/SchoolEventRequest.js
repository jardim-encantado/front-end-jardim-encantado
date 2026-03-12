export const toSchoolEventRequest = ({
  titulo,
  descricao,
  data,
  cpf,
  eventTypeId,
}) => {

  let obj = {
    name: titulo,
    description: descricao,
    eventDate: new Date(data).toISOString(), // Formato ISO 8601: "YYYY-MM-DDTHH:mm:ss"
    cpf: cpf,
    eventTypeId: eventTypeId,
  };

  console.log(obj)

  return obj
};