import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MenuPrincipal = () => {
  const [profileData, setProfileData] = useState({ name: '', gender: '' });
  const navigation = useNavigation(); // Hook para navegação

  // Função para carregar o nome e gênero da criança do AsyncStorage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const name = await AsyncStorage.getItem('childName');
        const gender = await AsyncStorage.getItem('childGender');
        if (name !== null && gender !== null) {
          setProfileData({ name, gender });
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do perfil', error);
      }
    };

    loadProfileData();
  }, []);

  // Escolha da imagem de perfil com base no gênero
  const getProfileImage = () => {
    return profileData.gender === 'Menina'
      ? require('../assets/ursinhofemea.png') // Imagem do urso fêmea
      : require('../assets/ursinhomacho.png'); // Imagem do urso macho
  };

  return (
    <View style={styles.container}>
      {/* Header com o urso e nome da criança */}
      <View style={styles.header}>
        <Image source={getProfileImage()} style={styles.profileImage} />
        <Text style={styles.greeting}>Olá, {profileData.name}</Text>
      </View>

      {/* Grid de jogos */}
      <View style={styles.gamesContainer}>
        <TouchableOpacity style={styles.gameButton}
        onPress={() => navigation.navigate('SplashColore')} >
          <Image source={require('../assets/Colore.png')} style={styles.gameImage} />
          <Text style={styles.gameText}>Colore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gameButton}
        onPress={() => navigation.navigate('SplashJogodaMemoria')} >
          <Image source={require('../assets/CacaFormas.png')} style={styles.gameImage} />
          <Text style={styles.gameText}>Caça-Formas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.gameButton} 
          onPress={() => navigation.navigate('SplashQuiz')} >
          <Image source={require('../assets/TeddyQuiz.png')} style={styles.gameImage} />
          <Text style={styles.gameText}>TeddyQuiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gameButton}>
          <Image source={require('../assets/Tabuada.png')} style={styles.gameImage} />
          <Text style={styles.gameText}>Primos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E5', // cor de fundo similar ao wireframe
  },
  header: {
    backgroundColor: '#FFE7C1',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 24,
    color: '#3F3D56',
    fontFamily: 'BalooBhai2-Bold', // Fonte similar ao estilo do wireframe
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  gameButton: {
    width: '40%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  gameImage: {
    width: 120,
    height: 120,
    borderRadius: 20, // Bordas arredondadas
  },
  gameText: {
    marginTop: 10,
    fontSize: 18,
    color: '#3F3D56',
    fontFamily: 'BalooBhai2-Regular',
  },
});

export default MenuPrincipal;