import api from "./config";

const identity = (value) => value;

const normalizeCollectionResponse = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (payload && typeof payload === "object") {
        return [payload];
    }

    return [];
};

const validateId = (id) => {
    if (id === null || id === undefined || id === "") {
        throw new Error("Id is required");
    }
};

export function createApiRepository(apiEndpoint, toRequest = identity, toSchema = identity) {
    return {
        async getById(id) {
            try {
                validateId(id);
                const response = await api.get(`${apiEndpoint}/${id}`);
                return toSchema(response.data);
            } catch (error) {
                console.error(`Error fetching data from ${apiEndpoint} with id ${id}:`, error);
                throw error;
            }
        },

        async getAll() {
            try {
                const response = await api.get(apiEndpoint);
                const data = normalizeCollectionResponse(response.data);
                return data.map(toSchema).filter(Boolean);
            } catch (error) {
                console.error(`Error fetching data from ${apiEndpoint}:`, error);
                throw error;
            }
        },

        async create(data) {
            try {
                const payload = toRequest(data);
                const response = await api.post(apiEndpoint, payload);
                return toSchema(response.data);
            } catch (error) {
                console.error(`Error creating data in ${apiEndpoint}:`, error);
                throw error;
            }
        },

        async update(id, data) {
            try {
                validateId(id);
                const payload = toRequest(data);
                const response = await api.put(`${apiEndpoint}/${id}`, payload);
                return toSchema(response.data);
            } catch (error) {
                console.error(`Error updating data in ${apiEndpoint} with id ${id}:`, error);
                throw error;
            }
        },

        async delete(id) {
            try {
                validateId(id);
                await api.delete(`${apiEndpoint}/${id}`);
            } catch (error) {
                console.error(`Error deleting data from ${apiEndpoint} with id ${id}:`, error);
                throw error;
            }
        },
    };
}