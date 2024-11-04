import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';

const SplashJogodaMemoria = () => {
  const navigation = useNavigation();
  const fadeAnim1 = useRef(new Animated.Value(0)).current; // Animação de opacidade para a primeira imagem
  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Animação de opacidade para a segunda imagem
  const translateY = useRef(new Animated.Value(-500)).current; // Animação de movimento para cima

  useEffect(() => {
    // Animação de aparecer/desaparecer alternado entre as duas imagens
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 1, // Aparece a primeira imagem
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // Move para baixo
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim1, {
          toValue: 0, // Desaparece a primeira imagem
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim2, {
          toValue: 1, // Aparece a segunda imagem
          duration: 3100,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeAnim2, {
        toValue: 0, // Desaparece a segunda imagem
        duration: 3100,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("JogoDaMemoria"); // Substitua com a tela principal do jogo
    }, 6000); // Tempo de carregamento de 6 segundos

    return () => clearTimeout(timer); // Limpa o timer
  }, [navigation, fadeAnim1, fadeAnim2]);

  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Caça Formas</Text>
        <Text style={styles.subtitle}>
          Prepare-se para testar sua memória enquanto caça formas!
        </Text>
      </View>
      
      {/* Animações de opacidade para as imagens */}
      <Animated.Image 
        source={require('../assets/ursoCortado.png')} 
        style={[styles.bearImage1, { opacity: fadeAnim1 }]} 
      />
      <Animated.Image 
        source={require('../assets/ursoCortado2.png')} 
        style={[styles.bearImage2, { opacity: fadeAnim2 }]} 
      />
      
      <ActivityIndicator size="large" color="#6D6A75" style={styles.loadingIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE2A4', // Cor de fundo amarela suave
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textWrapper: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D6A75',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#6D6A75',
    textAlign: 'center',
    marginTop: 10,
  },
  bearImage1: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: [{ translateX: -225 }], // Move um pouco para a direita
    marginBottom: 0,
  },
  bearImage2: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 320, // Suba a segunda imagem ajustando a posição
    left: '50%',
    transform: [{ translateX: -225 }], // Move um pouco para a esquerda
  },
  
  loadingIndicator: {
    marginTop: 30,
  },
});

export default SplashJogodaMemoria;
 
