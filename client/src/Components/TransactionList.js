import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { Transaction } from './Transaction'

export const TransactionList = () => {
    const { transactions, getTransactions } = useContext(GlobalContext)

    useEffect(() => {
        getTransactions();
    }, [])

    // React forces you to return a single element, therefore encapsulate multiple elements in one

    // pull context from GlobalState using `useContext` hook

    return (
        <>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (<Transaction key={transaction._id} transaction={transaction} />))}
            </ul>
        </>
    )
}
