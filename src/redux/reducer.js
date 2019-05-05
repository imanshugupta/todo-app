import * as ActionTypes from './actionTypes';

export const Todos = (state={todos: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_NEW_TODO:
            action.payload.id = state.todos.length
            return {...state, todos: state.todos.concat(action.payload)}

        case ActionTypes.EDIT_TODO:
            state.todos[action.todoId] = action.todo
            return state

        case ActionTypes.MARK_DONE:
            if(state.todos[action.payload].done) state.todos[action.payload].done = false
            else state.todos[action.payload].done = true
            return state

        case ActionTypes.DELETE_TODO:
            state.todos.splice(action.payload, 1)
            state.todos.filter(item=> item.id > action.payload).map(item=> {
                item.id--
                return item
            })
            return {...state}
        default:
            return state
    }
}