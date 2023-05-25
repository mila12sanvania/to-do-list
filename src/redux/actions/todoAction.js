export const ADD_TODO = "ADD_TODO"
export const DELETE_TODO = "DELETE_TODO"
export const EDIT_TODO = "EDIT_TODO"
export const COMPLETE_TODO = "COMPLETE_TODO"
export const FILTER_ACTIVE_TODO = "FILTER__ACTIVE_TODO"
export const FILTER_COMPLETE_TODO = "FILTER_COMPLETE_TODO"



export const addTodo = (todo) => {

    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const deleteTodo = (todo) => {
    return {
        type: DELETE_TODO,
        payload: todo
    }
}

export const editTodo = (todo) => {
    return {
        type: EDIT_TODO,
        payload: todo
    }
}

export const completeTodo = (todo) => {
    return {
        type: COMPLETE_TODO,
        payload: todo
    }
}

export const activeFilterTodo = (todo) => {
    return {
        type: FILTER_ACTIVE_TODO,
        payload: todo
    }
}

export const completeFilterTodo = (todo) => {
    return {
        type: FILTER_COMPLETE_TODO,
        payload: todo
    }
}