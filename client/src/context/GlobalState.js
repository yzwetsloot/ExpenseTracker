/*
    in case of a multiple resources, ensure resource-specific context (f.e. ProfileContext/State)
*/
import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

// initial state
const initialState = {
    transactions: [

    ],
    loading: true,
    error: null
}

// create global context
export const GlobalContext = createContext(initialState)

// components use a Provider component to access global store or context
// it provides access to state and actions to perform updates to that state
export const GlobalProvider = ({ children }) => { // takes in as props the other components
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions
    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }

    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })            
        }
    }

    // actions must be passed as props to GlobalContext.Provider

    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            loading: state.loading,
            error: state.error,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
