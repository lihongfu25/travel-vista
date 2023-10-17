export const generateUniqueId = (prefix: string) => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}_${timestamp}_${random}`;
};

export const mergeValidates = (
  validates:
    | Array<{
        [key: string]: { value: boolean | number | RegExp; message: string };
      }>
    | undefined
) => {
  if (!validates) return {};
  return validates.reduce((result, currentObject) => {
    return { ...result, ...currentObject };
  }, {});
};
