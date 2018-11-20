export const AddFilterBy = (filterByCondtion, id, filterBy) => {
    filterByCondtion[id] = {
        ...filterByCondtion[id],
        filterBy: filterBy
    }
    return (
        {
            type: "ADD_UPDATE_CONDITION",
            filterByCondtion: filterByCondtion
        }
    )
}

export const AddOperation = (filterByCondtion, id, operation) => {
    filterByCondtion[id] = {
        ...filterByCondtion[id],
        operation: operation
    }
    return (
        {
            type: "ADD_UPDATE_CONDITION",
            filterByCondtion: filterByCondtion
        }
    )
}

export const AddCondition = (filterByCondtion, id, condition) => {
    filterByCondtion[id] = {
        ...filterByCondtion[id],
        condition: condition
    }
    return (
        {
            type: "ADD_UPDATE_CONDITION",
            filterByCondtion: filterByCondtion
        }
    )
}
