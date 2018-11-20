
export const arrayToObject = (arr, keyField) =>
{return Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})))}
