import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import PatientReducer from './reducers/patientReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);


let store = createStore(
    PatientReducer,
    middleware
);

store.subscribe(() =>
    console.log(store.getState())
)
export default store;