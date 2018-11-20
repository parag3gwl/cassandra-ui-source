export function setColumns(clmnName, clmnValue) {
    return {
        type: "INSERT_COLUMNS",
        clmnName: clmnName,
        clmnValue: clmnValue
    }
}