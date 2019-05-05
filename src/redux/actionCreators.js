import * as ActionTypes from './actionTypes';
import { Users } from './users';

export const addNewTodo = (todo) => dispatch => {
    dispatch({ type: ActionTypes.ADD_NEW_TODO, payload: todo })
}

export const deleteTodo = (todoId) => dispatch => {
    dispatch({ type: ActionTypes.DELETE_TODO, payload: todoId })
}

export const editTodo = (todoId, todo) => dispatch => {
    dispatch({ type: ActionTypes.EDIT_TODO, todoId, todo })
}

export const markDone = (todoId) => dispatch => {
    dispatch({ type: ActionTypes.MARK_DONE, payload: todoId })
}

export const userLogin = (creds) => {
    let user = Users.filter(user=> user.username === creds.username)[0]
    if(user) {
        if(user.password === creds.password) return true
        else return false
    }
}