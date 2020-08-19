import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
// `useState` is a React hook

export const AddTransaction = () => {
    // component-level state
    // [state, action to manipulate state]
    // `useState` returns state and action to manipulate state
    const [text, setText] = useState('') // default 
    const [amount, setAmount] = useState(0) // default 

    const { addTransaction } = useContext(GlobalContext)

    const onSubmit = (e) => {
        e.preventDefault()

        const newTransaction = {
            id: Math.floor(Math.random() * 1000000000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction)
    }

    return (
        <>
            { /* `class` and `for` HTML keys not allowed in JSX, use `className` and `htmlFor` instead */}
            <h3> Add new transaction</h3 >
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" placeholder="Enter amount..." value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
