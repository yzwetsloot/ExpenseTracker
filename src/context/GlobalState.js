/*
    in case of a multiple resources, ensure resource-specific context (f.e. ProfileContext/State)
*/
import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// initial state
const initialState = {
    transactions: [

    ]
}

// create global context
export const GlobalContext = createContext(initialState)

// components use a Provider component to access global store or context
// it provides access to state and actions to perform updates to that state
export const GlobalProvider = ({ children }) => { // takes in as props the other components
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    // actions must be passed as props to GlobalContext.Provider

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
