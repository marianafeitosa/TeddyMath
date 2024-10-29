import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

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
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
          <View style={styles.progressStep} />
        </View>
      </View>



        <Text style={styles.title}>Crie o perfil do seu filho e comece a aventura.</Text>
        <Text style={styles.subtitle}>Dê o primeiro passo para a diversão e aprendizado!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CadastroNomeGenero')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
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
  },
  backArrow: {
    fontSize: 24,
    color: '#F9CBA2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  progressStep: {
    width: 40,
    height: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
  },
  activeStep: {
    backgroundColor: '#F6CC84',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#F9CBA2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateProfileScreen;
