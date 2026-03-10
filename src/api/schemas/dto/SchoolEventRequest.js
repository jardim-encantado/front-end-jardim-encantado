export const toSchoolEventRequest = ({
  titulo,
  descricao,
  data,
  cpf,
  eventTypeId,
}) => {
  return {
    name: titulo,
    description: descricao,
    eventDate: data,
    cpf,
    eventTypeId,
  };
};