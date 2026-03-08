export const sanitizeCpf = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/\D/g, "");
};

export const removeUndefinedFields = (value) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined);

  return entries.length ? Object.fromEntries(entries) : undefined;
};
