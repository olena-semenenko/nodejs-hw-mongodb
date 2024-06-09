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
  const isBollean = isFavourite === 'true';
  return isBollean ? true : false;
};
export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
