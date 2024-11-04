import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Perfil = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/seta.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIcon}>
          <Image source={require('../assets/editar-icon.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://example.com/imagem-perfil.jpg' }} // Insira a URL da imagem de perfil aqui
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Bolsonaro</Text>
        <Text style={styles.profileRole}>Responsável</Text>
      </View>

      {/* Área Criança */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Área Criança</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionTitle}>Download Imagens</Text>
          <Text style={styles.optionSubtitle}>Visualize os desenhos que sua criança pintou!</Text>
          <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProgressoCrianca')}>
          <Text style={styles.optionTitle}>Progresso Criança</Text>
          <Text style={styles.optionSubtitle}>Confira o progresso da sua criança em cada jogo!</Text>
          <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
        <View style={styles.option}>
          <Image source={require('../assets/id-icon.png')} style={styles.iconImage} />
          <Text style={styles.optionTitle}>102020300</Text>
          <Text style={styles.optionSubtitle}>ID da criança</Text>
        </View>
      </View>

      {/* Conta */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>
        <TouchableOpacity style={styles.option}>
          <Image source={require('../assets/sair-icon.png')} style={styles.iconImage} />
          <Text style={styles.optionTitle}>Sair</Text>
          <Text style={styles.optionSubtitle}>Encerrar sessão da sua conta.</Text>
          <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={require('../assets/excluir-icon.png')} style={styles.iconImage} />
          <Text style={styles.optionTitle}>Excluir</Text>
          <Text style={styles.optionSubtitle}>Solicitar a exclusão permanente da sua conta.</Text>
          <Text style={styles.optionArrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6E5',
  },
  header: {
    backgroundColor: '#FFE7C1',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  editIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F3D56',
  },
  profileRole: {
    fontSize: 16,
    color: '#3F3D56',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F3D56',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  optionTitle: {
    fontSize: 16,
    color: '#3F3D56',
    flex: 1,
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#A1A1A1',
    flex: 2,
  },
  optionArrow: {
    fontSize: 18,
    color: '#A1A1A1',
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});

export default Perfil;
