export  const arrayToObject = (arrayToObject, keyField) => {
    return Object.assign({}, ...arrayToObject.map(item=> (
        {[item[keyField]]: item}
    )))
}