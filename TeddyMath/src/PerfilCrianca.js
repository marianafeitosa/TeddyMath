import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PerfilCrianca = ({ route }) => {
  const { nome, imageUrl } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.nome}>{nome}</Text>
      <Image source={{ uri: imageUrl }} style={styles.imagem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAE6',
  },
  nome: {
    fontSize: 24,
    marginBottom: 20,
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

export default PerfilCrianca;