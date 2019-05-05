import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Todos } from './reducer';

export const configureStore = () => {
    let store =  createStore(combineReducers({
        todos: Todos
    }), applyMiddleware(thunk, logger))
    return store;
}