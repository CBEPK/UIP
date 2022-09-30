import React, {useContext, useEffect, useReducer} from "react";
import {actionTypes} from './actionTypes'

import {fetchData} from "../api/fetchData";

export const initialState = {
  tasks: [],
  isAdmin: false,
  isLoading: false,
  error: ''
};

export const ContextApp = React.createContext();

export const TasksContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  useEffect(() => {
    fetchData(dispatch)
  }, []);

  return (<ContextApp.Provider value={{state, dispatch}}>
    {children}
  </ContextApp.Provider>)
}

export const taskReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.GET_TASKS_SUCCESS: {
      return {
        ...state,
        tasks: action.payload,
        isLoading: false
      };
    }
    case actionTypes.GET_TASKS_FAILED: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    }

    case actionTypes.EDIT_TASK_SUCCESS: {
      let {id} = action.payload
      let newData = state.tasks.map(task=> task.id == id ? action.payload : task )

      return {
        ...state,
        tasks: newData,
      };
    }
    case actionTypes.EDIT_TASK_FAILED: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case actionTypes.LOGIN_ADMIN_SUCCESS: {
      return {
        ...state,
        isAdmin: true
      };
    }
    case actionTypes.GET_TASKS_FAILED: {
      return {
        ...state,
        error: action.payload,
        isAdmin: false
      };
    }

    case actionTypes.LOGOUT_ADMIN: {
      return {
        ...state,
        isAdmin: false
      };
    }


    default:
      return state
  }
};

export const useTasks = () => {
  return useContext(ContextApp)
}