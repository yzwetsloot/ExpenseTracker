import React from 'react';
import { Header } from './Components/Header'
import { Balance } from './Components/Balance'
import { IncomeExpense } from './Components/IncomeExpense'
import { TransactionList } from './Components/TransactionList'
import { AddTransaction } from './Components/AddTransaction'

import { GlobalProvider } from './context/GlobalState'

import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className='container'>
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
