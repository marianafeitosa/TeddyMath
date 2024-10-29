import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';

// Supondo que você tenha o caminho da imagem BackgroundSplashColore
const backgroundImage = require('../assets/BackgroundSplashJogo1.png'); // Ajuste o caminho da imagem

const SplashColore = ({ navigation }) => {
  // Navegação automática após 3 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("JogoColorir"); // Ajuste para a tela correta de navegação
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, [navigation]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>TeddyMath Colore</Text>
        <Text style={styles.subtitle}>Solte sua criatividade e divirta-se colorindo!</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashColore;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6D4C41',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6D4C41',
    paddingHorizontal: 20,
  },
});
