import React from 'react';
import {createStore , applyMiddleware} from 'redux';
import authReducer from './reducers/authReducer';
import navReducer from './reducers/navReducer';
import mapReducer from './reducers/mapReducer';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    authReducer,
    navReducer,
    mapReducer
});

const middleware = applyMiddleware(thunk);

let store = createStore(
    rootReducer,
    middleware
);

export default store;