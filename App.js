import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { BankProvider } from './src/context/BankContext';
import HomeScreen from './src/screens/HomeScreen';
import TransferScreen from './src/screens/TransferScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BankProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#2f2f2f',
                height: 60,
                paddingTop: 0,
                paddingBottom: 0,
              },
              tabBarItemStyle: {
                margin: 0,
                borderRadius: 0,
              },
              tabBarActiveBackgroundColor: '#0ea5e9',
              tabBarInactiveTintColor: '#fff',
              tabBarActiveTintColor: '#fff',
              tabBarLabelStyle: { fontSize: 13, fontWeight: '700' },
            }}
          >
            <Tab.Screen
              name="Inicio"
              component={HomeScreen}
              options={{
                tabBarLabel: ({ color }) => (
                  <Text style={{ color, fontSize: 13, fontWeight: '700' }}>Inicio</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Transferencias"
              component={TransferScreen}
              options={{
                tabBarLabel: ({ color }) => (
                  <Text style={{ color, fontSize: 13, fontWeight: '700' }}>Transferencia</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="swap-horizontal" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Histórico"
              component={HistoryScreen}
              options={{
                tabBarLabel: ({ color }) => (
                  <Text style={{ color, fontSize: 13, fontWeight: '700' }}>Histórico</Text>
                ),
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="time" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </BankProvider>
  );
}
