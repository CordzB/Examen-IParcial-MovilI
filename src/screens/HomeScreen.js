import React from 'react';
import { Text, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBank } from '../context/BankContext';

export default function HomeScreen() {
  const { balance, transactions, depositFixed500, withdrawFixed200 } = useBank();

  const renderTx = ({ item }) => {
    let text;
    if (item.type === 'DEPOSITO') {
      text = `Depósito L.${item.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;
    } else if (item.type === 'RETIRO') {
      text = `Retiro L.${item.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;
    } else {
      text = `Transferencia a ${item.toName} (${item.toAccount}) L.${item.amount.toLocaleString('es-HN', { minimumFractionDigits: 2 })}`;
    }

    return (
      <View style={styles.txPill}>
        <Text style={styles.txPillText}>{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Mi Banco APP</Text>

      <Text style={styles.label}>Saldo Actual:</Text>
      <Text style={styles.balance}>L. {balance.toLocaleString('es-HN', { minimumFractionDigits: 2 })}</Text>

      <TouchableOpacity style={styles.primaryBtn} onPress={depositFixed500}>
        <Text style={styles.primaryBtnText}>Depositar L.500 al Saldo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={withdrawFixed200}>
        <Text style={styles.secondaryBtnText}>Retirar L.200</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Transacciones</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTx}
        ListEmptyComponent={<Text style={styles.empty}>Sin transacciones aún.</Text>}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginVertical: 12 },
  label: { fontSize: 14, color: '#3f3f46', marginTop: 8 },
  balance: { fontSize: 26, fontWeight: '800', marginBottom: 12 },
  primaryBtn: { backgroundColor: '#1d4ed8', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginBottom: 8 },
  primaryBtnText: { color: '#fff', fontWeight: '800' },
  secondaryBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginBottom: 14 },
  secondaryBtnText: { color: '#111827', fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  empty: { color: '#888', textAlign: 'center', marginTop: 8 },
  txPill: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#d1d5db', paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  txPillText: { fontWeight: '700', color: '#111827' },
});
