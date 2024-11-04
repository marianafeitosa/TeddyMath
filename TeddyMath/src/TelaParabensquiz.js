import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ConfettiCannon from 'react-native-confetti-cannon';

const TelaParabensquiz = ({ route, navigation }) => {
  const { score, onContinue } = route.params;

  // Cria referências de animação para fade e escala
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Inicia animações de fade-in e zoom ao montar a tela
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Duração de 1 segundo
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,  // Reduzindo a fricção para um efeito mais suave
        tension: 80,  // Controla a intensidade do "bounce" no final
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBox}></View>

      {/* Efeito de parabéns com confetes */}
      <ConfettiCannon count={100} origin={{ x: wp('50%'), y: hp('10%') }} fadeOut={true} fallSpeed={2500} />

      {/* Aplica o fade-in na imagem do logo */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/logoParabens.png')} style={styles.logo} />
      </Animated.View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Sua pontuação:</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('SplashQuiz')} style={styles.reiniciarButton}>
        <View style={styles.reiniciarButtonInnerShadow} />
        <Text style={styles.reiniciarButtonText}>Continuar</Text>
        <View style={styles.reiniciarButtonHighlight} />
        <View style={styles.reiniciarButtonLightDot} />
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SplashQuiz')}>
          <Image source={require('../assets/botaoVoltar.png')} style={styles.button} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MenuPrincipal')}>
          <Image source={require('../assets/botaoHome.png')} style={styles.button} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('')}>
          <Image source={require('../assets/botaoConfiguracoes.png')} style={styles.button} />
        </TouchableOpacity>
      </View>

      <Image source={require('../assets/ursoCortado.png')} style={styles.urso} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF6E0',
  },
  backgroundBox: {
    position: 'absolute',
    bottom: hp('25%'),
    width: wp('78%'),  // Reduzindo a largura para 80%
    height: hp('38%'), // Reduzindo a altura para 40%
    backgroundColor: '#FFF5D1',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignSelf: 'center',
  },
  
  logoContainer: {
    width: wp('74%'), // Define a largura para 70% da tela
    height: hp('24%'), // Define a altura para 20% da tela
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'), // Espaço inferior para centralização sem afetar botões
    marginTop: -hp('2.5%'), // Mover um pouco para cima
  },
  logo: {
    width: '100%', // Ocupa todo o espaço do container
    height: '100%', // Ocupa todo o espaço do container
    resizeMode: 'contain',
    transform: [{ scale: 2 }], // Aumenta o tamanho da imagem ainda mais
  },
  
  
  
  scoreText: {
    fontSize: wp('6%'),
    fontFamily: 'Poppins_700Bold',
    color: '#5e5d5d',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: hp('3%'),
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
  },
  scoreValue: {
    fontSize: wp('6%'),
    fontFamily: 'Poppins_700Bold',
    color: '#5e5d5d',
    fontSize: 48,
    textAlign: 'center',
    marginBottom: hp('3%'),
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 3,
    marginTop: -30,
  },
  reiniciarButton: {
    backgroundColor: '#A0E7E5',
    borderRadius: 20,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('12%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    position: 'relative',
    zIndex: 1,
    marginTop: -20,
    
  },
  reiniciarButtonInnerShadow: {
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    backgroundColor: '#8ED3D1',
    borderRadius: 12,
    zIndex: 0,
  },
  reiniciarButtonText: {
    color: '#fff',
    fontSize: wp('7%'),
    fontFamily: 'Poppins_700Bold',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 2,
  },
  reiniciarButtonHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 1,
  },
  reiniciarButtonLightDot: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('70%'),
    marginBottom: hp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 2,
  },
  button: {
    width: wp('30%'),
    height: hp('8%'),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    position: 'relative',
    zIndex: 1,
    marginTop: -0,
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  
  urso: {
    width: wp('100%'),
    height: wp('100%'),
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -hp('8%'),
    left: '50%',
    transform: [{ translateX: -wp('50%') }],
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 1,
  },
});

export default TelaParabensquiz;
