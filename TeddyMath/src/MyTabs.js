import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import MenuPrincipal from './MenuPrincipal';
import Configuracoes from './Configuracoes';
import PerfilCrianca from './PerfilCrianca';

const Tab = createBottomTabNavigator();
const isLoggedIn = false; // Simulação de autenticação

// Dados fictícios da criança para simulação
const CadastroIdade = () => {
  const handleSave = async () => {
    const nome = "Nome da Criança"; // Obtenha isso da entrada do usuário
    const genero = "Menina"; // Obtenha isso da entrada do usuário
    const idade = 6; // Obtenha isso da entrada do usuário
    await saveChildData(nome, genero, idade);
  };
};

const MyTabs = ({ navigation }) => {
  const handleProfilePress = () => {
    if (isLoggedIn) {
      navigation.navigate('Perfil');
    } else {
      navigation.navigate('Security'); // Redireciona para segurança se não estiver logado
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
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
        name="PerfilCrianca"
        children={() => <PerfilCrianca crianca={dadosDaCrianca} />} // Passa os dados da criança como propriedade
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={handleProfilePress}>
              <Image
                source={require('../assets/profile-icon.png')}
                style={[styles.navIcon, { tintColor: props.focused ? '#f6cc84' : '#757474' }]}
              />
            </TouchableOpacity>
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#e9e8e7',
    borderRadius: 30,
    height: 70,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarIcon: {
    width: 30,
    height: 30,
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default MyTabs;
