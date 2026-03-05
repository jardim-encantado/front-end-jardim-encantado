import api from "./config";
import { toPersonRequestModel } from "../model/PersonRequestModel";
import {
    toPersonResponseListModel,
    toPersonResponseModel,
} from "../model/PersonResponseModel";

const PERSONS_ENDPOINT = "/persons";

const validateId = (id) => {
    if (id === null || id === undefined || id === "") {
        throw new Error("Person id is required");
    }
};

export const createPerson = async (personData) => {
    try {
        const payload = toPersonRequestModel(personData);
        const response = await api.post(PERSONS_ENDPOINT, payload);
        return toPersonResponseModel(response.data);
    } catch (error) {
        console.error("Error creating person:", error);
        throw error;
    }
};

export const getAllPersons = async () => {
    try {
        const response = await api.get(PERSONS_ENDPOINT);
        return toPersonResponseListModel(response.data);
    } catch (error) {
        console.error("Error fetching persons:", error);
        throw error;
    }
};

export const getPersonById = async (id) => {
    try {
        validateId(id);
        const response = await api.get(`${PERSONS_ENDPOINT}/${id}`);
        return toPersonResponseModel(response.data);
    } catch (error) {
        console.error(`Error fetching person with id ${id}:`, error);
        throw error;
    }
};

export const updatePerson = async (id, personData) => {
    try {
        validateId(id);
        const payload = toPersonRequestModel(personData);
        const response = await api.put(`${PERSONS_ENDPOINT}/${id}`, payload);
        return toPersonResponseModel(response.data);
    } catch (error) {
        console.error(`Error updating person with id ${id}:`, error);
        throw error;
    }
};

export const create = createPerson;
export const getAll = getAllPersons;
export const getById = getPersonById;
export const update = updatePerson;