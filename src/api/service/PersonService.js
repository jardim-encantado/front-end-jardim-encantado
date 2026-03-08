import api from "../integration/config";
import { createApiRepository } from "../integration/Repository";
import { toPersonRequestModel } from "../dto/PersonRequestModel";
import {
    toPersonResponseModel,
} from "../dto/PersonResponseModel";

const PERSONS_ENDPOINT = "/v1/persons";
const personApi = createApiRepository(PERSONS_ENDPOINT, toPersonRequestModel, toPersonResponseModel);

const validateId = (id) => {
    if (id === null || id === undefined || id === "") {
        throw new Error("Person id is required");
    }
};

export const createPerson = async (personData) => {
    return personApi.create(personData);
};

export const getAllPersons = async () => {
    const persons = await personApi.getAll();
    return persons.filter(Boolean);
};

export const getPersonById = async (id) => {
    validateId(id);
    return personApi.getById(id);
};

export const updatePerson = async (id, personData) => {
    validateId(id);
    return personApi.update(id, personData);
};

export const deletePerson = async (id) => {
    validateId(id);
    return personApi.delete(id);
};


export const login = async (cpf, password) => {
    try {
        const payload = {
            cpf: cpf.replace(/\D/g, ""),
            password,
        };
        const response = await api.post(`${PERSONS_ENDPOINT}/login`, payload);
        return toPersonResponseModel(response.data);
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}