import React from 'react';
// import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import PatientReducer from './reducers/patientReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);


let store = createStore(
    PatientReducer,
    middleware
);

store.subscribe(() =>
    console.log('data from store : ', store.getState())
)
export default store;