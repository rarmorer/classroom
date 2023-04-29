import React from "react";

export const userState = {
    username: '',
    password: '',
    isLoggedin: false,
    status: 'guest',
    error: false
}

export const rosterState = {
    roster: []
}
export const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
        return {
            ...state, 
            isLoggedin: true,
            username: action.payload.username,
            password: action.payload.password,
            status: action.payload.status
        }
        case 'LOGOUT': 
        return {
            ...state, 
            isLoggedin: false,
            username: '',
            password: '',
            status: 'guest'
        }
        case 'UPDATE_USERNAME':
        return {
          ...state, 
          username: action.payload.username
        }
        case 'UPDATE_PASSWORD': 
        return {
          ...state, 
          username: action.payload.username
        }
        case 'UPDATE_ERROR': 
        return {
          ...state,
          error: action.payload.error
        }
    }
}

export const rosterReducer = (state, action) => {
    switch(action.type) {
        case 'ADD':
            return {
                ...state, 
                roster: [...state.roster, action.payload.roster]
            }
        case 'REMOVE': 
            const studentIndex = state.findIndex((roster)=> roster.student === state.student);
            if ((studentIndex) > 0){
                return {
                    ...state, 
                    roster: state.roster.splice(studentIndex, 1)
                }
            }
            else return {
                ...state
            }
    }
}