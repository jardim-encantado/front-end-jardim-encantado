/*
  "enrollment": {
    "id": 0,
    "enrollment_date": "2026-03-08T05:07:07.101Z",
    "create_date": "2026-03-08T05:07:07.101Z",
    "update_date": "2026-03-08T05:07:07.101Z",
    "status": "PRE_ENROLLMENT"
  }
*/

export const toEnrollmentSchema = (enrollment = {}) => {
    if (!enrollment || typeof enrollment !== "object") {
        return null;
    }

    return {
        id: enrollment.id ?? null,
        enrollmentDate: enrollment.enrollment_date ?? enrollment.enrollmentDate ?? null,
        createDate: enrollment.create_date ?? enrollment.createDate ?? null,
        updateDate: enrollment.update_date ?? enrollment.updateDate ?? null,
        status: enrollment.status ?? "",
    };
};