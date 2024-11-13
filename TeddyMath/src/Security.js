import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const numberWords = ['ZERO', 'UM', 'DOIS', 'TRÊS', 'QUATRO', 'CINCO', 'SEIS', 'SETE', 'OITO', 'NOVE'];

const Security = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState([]);
  const [accessGranted, setAccessGranted] = useState(false);

  const generateRandomCode = () => {
    const codeArray = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    setGeneratedCode(codeArray);
    console.log('Código gerado:', codeArray); 
  };

  useEffect(() => {
    generateRandomCode();
  }, []);

  const handleAccess = () => {
    if (code === generatedCode.join('')) {
      setAccessGranted(true);
      navigation.navigate('Perfil'); // Redireciona diretamente ao Perfil
    } else {
      Alert.alert('Código incorreto', 'Tente novamente.');
      generateRandomCode();
      setCode('');
    }
  };

  const handleButtonPress = (number) => {
    if (code.length < 4 && !accessGranted) {
      setCode(code + number);
    }
  };

  const handleDelete = () => {
    setCode(code.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insira os números:</Text>
      <Text style={styles.generatedCodeText}>
        {generatedCode.map(number => numberWords[number]).join(' ')}
      </Text>
      <View style={styles.inputContainer}>
        {[...Array(4)].map((_, index) => (
          <Text key={index} style={styles.input}>{code[index] || '_'}</Text>
        ))}
      </View>
      {accessGranted && (
        <Text style={styles.successMessage}>Acesso concedido! Redirecionando...</Text>
      )}
      <View style={styles.buttonContainer}>
        {[...Array(10).keys()].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handleButtonPress(number)}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="delete" size={24} color="#6d5948" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.accessButton} onPress={handleAccess} disabled={accessGranted}>
        <Text style={styles.accessButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#faf1dc',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#6d5948',
    fontWeight: 'bold',
  },
  generatedCodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e9c96f',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#6d5948',
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#6d5948',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '25%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#f6cc84',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#6d5948',
    fontWeight: 'bold',
  },
  deleteButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6cc84',
    borderRadius: 10,
    marginTop: 10,
  },
  accessButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e9c96f',
    borderRadius: 5,
  },
  accessButtonText: {
    fontSize: 18,
    color: '#6d5948',
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
});

export default Security;
