const parseType = (type) => {
  const validTypes = ['work', 'home', 'personal'];
  const isString = typeof type === 'string';
  const isValid = validTypes.includes(type);
  if (!isString || !isValid) {
    return;
  }
  return type;
};
const parseIsFavourite = (isFavourite) => {
  const parsed = JSON.parse(isFavourite);
  if (typeof parsed === 'boolean') return parsed;
  return;
};
export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
