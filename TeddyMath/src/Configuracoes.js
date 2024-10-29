import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Configuracoes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option}>
          <Icon name="sync" size={20} color="#6d5948" />
          <Text style={styles.optionText}>Salvar Progresso</Text>
          <Icon name="chevron-right" size={20} color="#6d5948" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="person" size={20} color="#6d5948" />
          <Text style={styles.optionText}>Entrar na conta</Text>
          <Icon name="chevron-right" size={20} color="#6d5948" />
        </TouchableOpacity>

        <View style={styles.idContainer}>
          <Icon name="badge" size={20} color="#6d5948" />
          <Text style={styles.idText}>ID 12332323433</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf1dc',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6d5948',
    marginBottom: 20,
  },
  optionContainer: {
    backgroundColor: '#f6cc84',
    borderRadius: 10,
    padding: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#6d5948',
  },
  optionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#6d5948',
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  idText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#6d5948',
  },
});

export default Configuracoes;
