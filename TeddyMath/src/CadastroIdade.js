import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

const CadastroIdade = ({ route, navigation }) => {
  const { nome, genero } = route.params;
  const [idade, setIdade] = useState('');

  const saveChildData = async () => {
    if (!nome || !genero || !idade) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      console.log('Dados salvos no Firestore:', { nome, genero, idade });

      await addDoc(collection(db, 'Criancas'), {
        nome: nome,
        genero: genero,
        idade: idade,
      });

      navigation.navigate('MyTabs', { nome, genero, idade });
    } catch (error) {
      console.error("Erro ao salvar dados no Firestore: ", error);
      Alert.alert('Erro', 'Erro ao salvar os dados. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Quantos anos tem a criança?</Text>

<TouchableOpacity
  style={[styles.ageButton, idade === '6' && styles.ageButtonSelected]}
  onPress={() => setIdade('6')}
>
  <Text style={styles.ageText}>6 anos</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.ageButton, idade === '7' && styles.ageButtonSelected]}
  onPress={() => setIdade('7')}
>
  <Text style={styles.ageText}>7 anos</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[styles.ageButton, idade === '8' && styles.ageButtonSelected]}
  onPress={() => setIdade('8')}
>
  <Text style={styles.ageText}>8 anos</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={saveChildData}>
        <Text style={styles.nextButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7E9',
    paddingHorizontal: 30,
    justifyContent: 'center',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -250, // Posiciona o header mais próximo do topo
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 30,
  },
  ageButton: {
    width: '100%',
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F2BB57',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  ageButtonSelected: {
    backgroundColor: '#F2BB57',
  },
  ageText: {
    fontSize: 18,
    color: '#4A4A4A',
  },
  nextButton: {
    marginTop: 30,
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2BB57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroIdade;