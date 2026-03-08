import { createApiRepository } from "../integration/Repository";
import { createPerson } from "./PersonService";


const STUDENTS_ENDPOINT = "/v1/students";
const identity = (value) => value;
const studentApi = createApiRepository(STUDENTS_ENDPOINT, identity, identity);

export const createStudent = async (studentData) => {
    try {
        const personData = {
            ...studentData,
            role: "student",
            roleId: studentData?.roleId ?? studentData?.perfilId ?? studentData?.cargoId ?? 1,
        };

        const createdPerson = await createPerson(personData);

        if (!createdPerson?.id) {
            throw new Error("Unable to create student because person id is missing");
        }

        return studentApi.create({ personId: createdPerson.id });
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
};

export const getAllStudents = async () => studentApi.getAll();

export const getStudentById = async (id) => studentApi.getById(id);

export const updateStudent = async (id, studentData) => studentApi.update(id, studentData);

export const deleteStudent = async (id) => studentApi.delete(id);
