import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Importe a configuração do Firebase

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Autenticação com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Perfil'); // Redireciona para a página de perfil ao fazer login com sucesso
    } catch (error) {
      // Tratamento de erros de autenticação
      let errorMessage = "Erro ao fazer login.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "E-mail inválido.";
          break;
        case 'auth/user-not-found':
          errorMessage = "Usuário não encontrado.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Senha incorreta.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      
      {/* Input de Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#BFBFBF"
      />
      
      {/* Input de Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputPassword}
          placeholderTextColor="#BFBFBF"
        />
        {/* Ícone de olho (apenas design, não funcional) */}
        <TouchableOpacity>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>

      {/* Esqueceu a senha */}
      <TouchableOpacity onPress={() => Alert.alert('Recuperação de senha')}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>
          Não possui conta? <Text style={styles.signupLink}>Cadastre-se</Text>
        </Text>
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
    alignItems: 'center',
  },
  logo: {
    width: 150, // Ajuste conforme a sua imagem
    height: 100, // Ajuste conforme a sua imagem
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#BFBFBF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#7FB6AE',
    marginBottom: 30,
    fontSize: 14,
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F2BB57',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#000',
    fontSize: 14,
  },
  signupLink: {
    color: '#7FB6AE',
    fontWeight: 'bold',
  },
});

export default Login;
