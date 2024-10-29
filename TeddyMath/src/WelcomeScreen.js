import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aprendendo Matemática Brincando!</Text>
      <Text style={styles.subtitle}>
        Aprenda matemática de maneira lúdica, enquanto se diverte com o Teddy!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateProfileScreen')} // Substitua pela navegação correta
      >
        <Text style={styles.buttonText}>Vamos começar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')} // Substitua pela navegação correta
      >
        <Text style={styles.textLink}>Já tenho conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#F9CBA2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  textLink: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
