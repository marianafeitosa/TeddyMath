import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText'; // Importação do CustomText

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} weight="bold">
      Vamos brincar de matemática!
      </CustomText>
      <CustomText style={styles.subtitle}>
      O TeddyMath está pronto para te ajudar a aprender e se divertir! Vamos começar essa aventura juntos?
      </CustomText>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateProfileScreen')} // Substitua pela navegação correta
      >
        <CustomText style={styles.buttonText} weight="bold">
          Vamos começar
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')} // Substitua pela navegação correta
      >
        <CustomText style={styles.textLink}>
          Já tenho conta
        </CustomText>
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
    fontSize: 36,
    color: '#434343',
    textAlign: 'center',
    marginHorizontal: 20,
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
    position: 'absolute', // Posiciona o botão de forma absoluta na tela
    bottom: 100,           // Distância do botão até o canto inferior da tela
    alignSelf: 'center',  // Centraliza o botão horizontalmente
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Cor da sombra (ajustável)
    textShadowOffset: { width: 1, height: 1 }, // Deslocamento horizontal e vertical
    textShadowRadius: 2, // Desfoque da sombra
},

textLink: {
  fontSize: 16,
  color: '#BE9855',
  textDecorationLine: 'underline',
  position: 'absolute',  // Posiciona o texto de forma absoluta na tela
  bottom: -250,            // Distância do texto até o canto inferior (ajuste conforme necessário)
  alignSelf: 'center',   // Centraliza o texto horizontalmente
},

});

export default WelcomeScreen;
