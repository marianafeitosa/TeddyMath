// src/MyTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';
import MenuPrincipal from './MenuPrincipal'; // Importando o MenuPrincipal
import Configuracoes from './Configuracoes'; // Importando a tela de configurações
import Perfil from './Perfil'; // Importando a tela de perfil
import Security from './Security'; // Importando a tela de segurança

const Tab = createBottomTabNavigator();

// Simulação de verificação de login. Você deve substituir isso pela sua lógica de autenticação real.
const isLoggedIn = false; // Defina como true se o pai estiver logado.

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: '#e9e8e7',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          width: 30,
          height: 30,
        },
      }}
    >
      <Tab.Screen
        name="MenuPrincipal"
        component={MenuPrincipal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/home-icon.png')}
              style={[styles.navIcon, { tintColor: focused ? '#f6cc84' : '#757474' }]}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={Configuracoes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/settings-icon.png')}
              style={[styles.navIcon, { tintColor: focused ? '#f6cc84' : '#757474' }]}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil} // Navega para a tela de perfil se logado, caso contrário para a tela de segurança
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../assets/profile-icon.png')}
              style={[styles.navIcon, { tintColor: focused ? '#f6cc84' : '#757474' }]}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default MyTabs;
