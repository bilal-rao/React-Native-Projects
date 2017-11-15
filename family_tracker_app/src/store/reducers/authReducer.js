import React from 'react';
import AUTHUSER from '../actions/authUser';

const INITAL_STATE = {
    data : [],
    getData : false
}

function authReducer(state=INITAL_STATE,action){
        switch(action.type){
            case AUTHUSER.SIGNUP:
            return {...state , data:action.payload};
            case AUTHUSER.SIGNIN:
            return {...state , data:action.payload};
            case AUTHUSER.SIGNOUT:
            return {...state , data : action.payload};
            case AUTHUSER.UPDATEPROFILE:
            return {...state , userLocation : action.payload}
            default:
            return state;
        }
}

export default authReducer;