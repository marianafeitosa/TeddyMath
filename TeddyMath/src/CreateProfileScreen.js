import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import CustomText from './CustomText'; // Importação do CustomText

const { width } = Dimensions.get('window'); // Get screen width for responsiveness

const CreateProfileScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/CreateProfileScreen.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Barra de progresso e botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <CustomText style={styles.backArrow}>{'<'}</CustomText>
          </TouchableOpacity>
          <View style={styles.progressBar}>
            <View style={[styles.progressStep, styles.activeStep]} />
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
          </View>
        </View>

        <CustomText style={styles.title} weight="bold">
          Crie o perfil do seu pequeno aventureiro!
        </CustomText>
        <CustomText style={styles.subtitle}>
          Com a sua ajuda, o TeddyMath vai saber exatamente como guiar seu filho nessa jornada de descobertas matemáticas.
        </CustomText>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroNomeGenero')}
        >
          <CustomText style={styles.buttonText} weight="bold">
            Continuar
          </CustomText>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: {
    fontSize: 24,
    color: '#F9CBA2',
  },
  progressBar: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-around',
   
    zIndex: 1,
  },
  progressStep: {
    width: width * 0.2, // Responsive width for each step
    height: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
  },
  activeStep: {
    backgroundColor: '#F6CC84',
  },
  title: {
    fontSize: 30, 
    color: '#434343',
    textAlign: 'center',
    marginTop: -300,
  },
  subtitle: {
    fontSize: 18,
    color: '#434343',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  
  button: {
    backgroundColor: '#F9CBA2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 3,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default CreateProfileScreen;
