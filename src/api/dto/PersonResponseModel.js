import { makePersonSchema, makePersonSchemaList } from "../schemas/Person";

export const toPersonResponseModel = (person = {}) => makePersonSchema(person);

export const toPersonResponseListModel = (persons = []) => {
  return makePersonSchemaList(persons);
};
