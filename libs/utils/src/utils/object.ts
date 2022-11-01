// Temp until we have a more TS friendly way of doing this
export const omit = (obj: Record<string, unknown>, fields: string[]) => {
  const newObj = { ...obj };
  fields.forEach((field) => delete newObj[field]);
  return newObj;
};
