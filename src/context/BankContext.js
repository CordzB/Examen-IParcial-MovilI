import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';

const INITIAL_BALANCE = 10000;

const initialState = {
  balance: INITIAL_BALANCE,
  transactions: [], 
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function bankReducer(state, action) {
  switch (action.type) {
    case 'DEPOSIT': {
      const tx = {
        id: uid(),
        type: 'DEPOSITO',
        amount: action.amount,
        note: action.note ?? 'Depósito de L.500',
        date: new Date().toISOString(),
      };
      return { balance: state.balance + action.amount, transactions: [tx, ...state.transactions] };
    }
    case 'RETIRO': {
      if (action.amount > state.balance) return state;
      const tx = {
        id: uid(),
        type: 'RETIRO',
        amount: action.amount,
        note: action.note ?? `Retiro de L.${action.amount}`,
        date: new Date().toISOString(),
      };
      return { balance: state.balance - action.amount, transactions: [tx, ...state.transactions] };
    }
    case 'TRANSFERENCIA': {
      if (action.amount > state.balance) return state;
      const tx = {
        id: uid(),
        type: 'TRANSFERENCIA',
        amount: action.amount,
        note: action.note ?? `Transferencia de L.${action.amount}`,
        date: new Date().toISOString(),
      };
      return { balance: state.balance - action.amount, transactions: [tx, ...state.transactions] };
    }
    default:
      return state;
  }
}

const BankContext = createContext(null);

export function BankProvider({ children }) {
  const [state, dispatch] = useReducer(bankReducer, initialState);

  const depositFixed500 = () => dispatch({ type: 'DEPOSIT', amount: 500, note: 'Depósito de L.500' });

  const withdrawFixed200 = () => {
    if (state.balance < 200) {
      Alert.alert('Saldo insuficiente', 'No cuenta con el saldo para completar la transacción.');
      return;
    }
    dispatch({ type: 'RETIRO', amount: 200, note: 'Retiro de L.200' });
  };

  const transfer = (amount, toAccount, toName) => {
    const num = Number(String(amount).replace(',', '.'));
    if (!toAccount?.trim() || !toName?.trim()) return Alert.alert('Datos incompletos', 'Ingresa cuenta y nombre del destinatario.');
    if (Number.isNaN(num) || num <= 0) return Alert.alert('Monto inválido', 'Ingresa un monto mayor a 0.');
    if (num > state.balance) return Alert.alert('Saldo insuficiente', 'No cuenta con el saldo para completar la transacción.');

    dispatch({ type: 'TRANSFERENCIA', amount: num, note: `Transferencia a ${toName} (${toAccount}) por L.${num}` });
    Alert.alert('Transferencia exitosa', `Se transfirieron L.${num} a ${toName}.`);
  };

  const value = useMemo(() => ({
    balance: state.balance,
    transactions: state.transactions,
    depositFixed500,
    withdrawFixed200,
    transfer,
  }), [state.balance, state.transactions]);

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const ctx = useContext(BankContext);
  if (!ctx) throw new Error('useBank debe usarse dentro de <BankProvider>');
  return ctx;
}
