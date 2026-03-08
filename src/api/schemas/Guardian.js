import { toPersonSchema } from "./Person";


export const toGuardianSchema = (guardian = {}) => {
    if (!guardian || typeof guardian !== "object") {
        return null;
    }
    return {
        guardianId: guardian.guardian_id ?? guardian.id ?? null,
        person: toPersonSchema(guardian),
    };
};