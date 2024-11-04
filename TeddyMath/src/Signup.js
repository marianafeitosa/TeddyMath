import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from './firebaseConfig'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso. Verifique seu e-mail para confirmar.");
      
      await addDoc(collection(db, "Responsaveis"), {
        name,
        email,
        phone,
        birthdate: date.toLocaleDateString(),
      });

      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = "Erro ao cadastrar.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Este e-mail já está em uso.";
          break;
        case 'auth/invalid-email':
          errorMessage = "E-mail inválido.";
          break;
        case 'auth/weak-password':
          errorMessage = "A senha deve ter pelo menos 6 caracteres.";
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert("Erro", errorMessage);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastre-se</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#BFBFBF"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#BFBFBF"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.inputPassword}
          placeholderTextColor="#BFBFBF"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={styles.inputPassword}
          placeholderTextColor="#BFBFBF"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={styles.eyeIcon}>👁</Text>
        </TouchableOpacity>
      </View>

      <TextInputMask
        type={'cel-phone'}
        options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
        placeholder="Número"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholderTextColor="#BFBFBF"
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: date ? '#000' : '#BFBFBF' }}>
          {date ? date.toLocaleDateString() : 'mm/dd/yyyy'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backIcon: {
    fontSize: 24,
    color: '#F2BB57',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F2BB57',
    textAlign: 'center',
    marginBottom: 30,
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
    justifyContent: 'center',
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
});

export default Signup;
