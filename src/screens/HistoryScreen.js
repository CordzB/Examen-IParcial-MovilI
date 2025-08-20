import React from 'react';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBank } from '../context/BankContext';

export default function HistoryScreen() {
  const { transactions } = useBank();

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
      <View style={styles.pill}>
        <Text style={styles.pillText}>{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.title}>Mi Banco APP</Text>

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
  pill: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginBottom: 10 },
  pillText: { fontWeight: '700', color: '#111827' },
  empty: { color: '#888', textAlign: 'center', marginTop: 8 },
});
