import React from 'react';
import {createStore , applyMiddleware} from 'redux';
import authReducer from './reducers/authReducer';
import navReducer from './reducers/navReducer';
import mapReducer from './reducers/mapReducer';
import usersInfoReducer from './reducers/usersInfoReducer';
import addGroupReducer from './reducers/addGroupReducer';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    authReducer,
    navReducer,
    mapReducer,
    usersInfoReducer,
    addGroupReducer
});

const middleware = applyMiddleware(thunk);

let store = createStore(
    rootReducer,
    middleware
);
// store.subscribe(()=>console.log(store.getState()))

export default store;