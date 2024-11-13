import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const CadastroNomeGenero = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [genero, setGenero] = useState('');

  const handleNext = () => {
    if (nome && genero) {
      // Navega para o componente CadastroIdade, passando nome e gênero
      navigation.navigate('CadastroIdade', { nome, genero });
    } else {
      Alert.alert('Aviso', 'Por favor, preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={[styles.progressStep, styles.activeStep]} />
          <View style={styles.progressStep} />
        </View>
      </View>

      <Text style={styles.title}>Informe o gênero e o nome da criança:</Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            genero === 'Menina' ? styles.selectedButton : null,
          ]}
          onPress={() => setGenero('Menina')}
        >
          <Image source={require('../assets/ursinhofemea.png')} style={styles.genderImage} />
          <Text style={styles.genderText}>Menina</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            genero === 'Menino' ? styles.selectedButton : null,
          ]}
          onPress={() => setGenero('Menino')}
        >
          <Image source={require('../assets/ursinhomacho.png')} style={styles.genderImage} />
          <Text style={styles.genderText}>Menino</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome da Criança"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E5',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: -250, // Posiciona o header mais próximo do topo

  },
  backIcon: {
    fontSize: 24,
    color: '#F2BB57',
  },
  progressBar: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-around',
  },
  progressStep: {
    width: 85,  // Aumenta a largura de cada passo
    height: 12,
    backgroundColor: '#D3D3D3',
    borderRadius: 7,
  },
  activeStep: {
    backgroundColor: '#F6CC84',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E3E3E',
    textAlign: 'center',
    marginBottom: 30,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  genderButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#F8D26A',
    width: 100,
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#FFF6E5',
  },
  selectedButton: {
    backgroundColor: '#F6CC84',
  },
  genderImage: {
    width: 90,
    height: 90,
    borderRadius: 80,
    marginBottom: 5,
  },
  genderText: {
    fontSize: 16,
    color: '#3E3E3E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F6CC84',
    borderRadius: 20,
    padding: 10,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFF',
  },
  nextButton: {
    backgroundColor: '#F6CC84',
    padding: 15,
    borderRadius: 20,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
  },
  nextButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CadastroNomeGenero;
