import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBank } from '../context/BankContext';

export default function TransferScreen() {
  const { balance, transfer } = useBank();
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [amountText, setAmountText] = useState('');

  const onSubmit = () => {
    transfer(Number(amountText.replace(',', '.')), account, name);
    setAmountText(''); setAccount(''); setName('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Mi Banco APP</Text>

      <Text style={styles.balanceTitle}>Saldo Actual</Text>
      <Text style={styles.balance}>L. {balance.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</Text>

      <TextInput
        style={styles.input}
        placeholder="Número de cuenta"
        value={account}
        onChangeText={setAccount}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={amountText}
        onChangeText={setAmountText}
        keyboardType="decimal-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre Destinatario"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.primaryBtn} onPress={onSubmit}>
        <Text style={styles.primaryBtnText}>Transferir saldo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginVertical: 12 },
  balanceTitle: { fontSize: 14, color: '#3f3f46' },
  balance: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  input: { backgroundColor: '#f3f4f6', borderRadius: 10, borderWidth: 1, borderColor: '#d1d5db', paddingHorizontal: 12, paddingVertical: 12, marginBottom: 10 },
  primaryBtn: { backgroundColor: '#1d4ed8', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
});
