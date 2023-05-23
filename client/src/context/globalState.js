import React from "react";

export const userState = {
    username: '',
    password: '',
    isLoggedin: false,
    status: 'guest',
    error: false, 
    meetingArgs: {},
}
export const initsessionState = {
  sessionStarted: false
}

export const rosterState = {
    roster: []
}
export const userReducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_STATUS': 
        return {
            ...state, 
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
          password: action.payload.password
        }
        case 'UPDATE_ERROR': 
        return {
          ...state,
          error: action.payload.error
        }
        case 'UPDATE_ARGS':
          return {
            ...state, 
            meetingArgs: action.payload.meetingArgs
          }
    }
}

export const sessionReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_SESSION':
      return {
        ...state, 
        sessionStarted: action.payload.sessionStarted
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