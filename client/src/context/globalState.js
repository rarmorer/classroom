import React from "react";

export const userState = {
    username: '',
    password: '',
    isLoggedin: false,
    status: '',
    error: true, 
    meetingArgs: {},
}
export const initsessionState = {
  sessionStarted: false,
  sessionJoined: false
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
  switch (action.type) {
    case 'UPDATE_JOINED':
      return {
        ...state, 
        sessionJoined: action.payload.sessionJoined
      }
  }
}