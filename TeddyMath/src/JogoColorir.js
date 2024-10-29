import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Modal } from 'react-native';
import Svg, { Circle, Rect, Polygon, Path } from 'react-native-svg';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function JogoColorir() {
  const [corAtual, setCorAtual] = useState('#FF0000');
  const [pontos, setPontos] = useState([]);
  const [falhou, setFalhou] = useState(false);
  const [fase, setFase] = useState(1);
  const [modalVisivel, setModalVisivel] = useState(false);
  const viewRef = useRef(); // Referência para o View que será capturado

  const cores = ['#FF6B6B', '#99E2B4', '#A2D2FF', '#F8C8DC'];

  const areaDasFormas = {
    1: 40000,
    2: 30000,
    3: 30000,
    4: Math.PI * Math.pow(100, 2),
    5: 15000,
  };

  const nomesDasFormas = {
    1: 'Retângulo',
    2: 'Triângulo',
    3: 'Trapézio',
    4: 'Círculo',
    5: 'Hexágono',
  };

  const estaDentroDaForma = (x, y) => {
    switch (fase) {
      case 1:
      case 2:
      case 3:
      case 5:
        return x >= 50 && x <= 250 && y >= 100 && y <= 300;
      case 4:
        const dist = Math.sqrt(Math.pow(x - 150, 2) + Math.pow(y - 200, 2));
        return dist <= 100;
      default:
        return false;
    }
  };

  const handleTouch = (event) => {
    if (modalVisivel) return; // Impede pintura enquanto o modal está visível

    const { locationX, locationY } = event.nativeEvent;

    if (!estaDentroDaForma(locationX, locationY)) {
      setFalhou(true);
      return;
    }

    setPontos([...pontos, { x: locationX, y: locationY }]);

    const areaPreenchida = pontos.length * Math.PI * Math.pow(10, 2);
    const areaNecessaria = areaDasFormas[fase] * 2.2;

    if (areaPreenchida >= areaNecessaria) {
      setModalVisivel(true);  // Mostra o modal ao completar a fase
    }
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setFase(fase + 1);
    setPontos([]);
    setFalhou(false);
  };

  const tentarNovamente = () => {
    setFalhou(false);
    setPontos([]);
    setFase(1);
  };

  const renderizarForma = () => {
    switch (fase) {
      case 1:
        return <Rect x="50" y="100" width="200" height="200" fill="none" stroke="#BDBDBD" strokeWidth="5" />;
      case 2:
        return <Polygon points="150,100 50,300 250,300" fill="none" stroke="#BDBDBD" strokeWidth="5" />;
      case 3:
        return <Path d="M 50 300 L 100 100 L 200 100 L 250 300 Z" fill="none" stroke="#BDBDBD" strokeWidth="5" />;
      case 4:
        return <Circle cx="150" cy="200" r="100" fill="none" stroke="#BDBDBD" strokeWidth="5" />;
      case 5:
        return <Polygon points="150,100 50,200 150,300 250,200" fill="none" stroke="#BDBDBD" strokeWidth="5" />;
      default:
        return null;
    }
  };

  const salvarImagem = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Imagem salva!', 'A sua imagem foi salva na galeria.');
      } else {
        Alert.alert('Permissão negada!', 'Você precisa permitir o acesso à galeria para salvar a imagem.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground source={require('../assets/Background.png')} style={styles.background}>
      <View style={styles.container} ref={viewRef}>
        {falhou ? (
          <View style={styles.falhaContainer}>
            <Text style={styles.falhaTexto}>Você pintou fora da forma!</Text>
            <TouchableOpacity style={styles.botao} onPress={tentarNovamente}>
              <Text style={styles.botaoTexto}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <TouchableOpacity style={styles.botaoVoltar}>
                <Text style={styles.voltarTexto}>←</Text>
              </TouchableOpacity>
              <Text style={styles.titulo}>Colore</Text>
            </View>

            <Svg height="400" width="300" style={styles.svg} onTouchStart={handleTouch} onTouchMove={handleTouch}>
              {renderizarForma()}

              {pontos.map((ponto, index) => (
                <Circle key={index} cx={ponto.x} cy={ponto.y} r="15" fill={corAtual} />
              ))}
            </Svg>

            <View style={styles.paleta}>
              {cores.map((cor, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.botaoCor, { backgroundColor: cor }]}
                  onPress={() => setCorAtual(cor)}
                />
              ))}
            </View>

            <StatusBar style="auto" />
          </>
        )}

        {/* Modal para mostrar a conclusão da fase */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.modalTitulo}>Parabéns!</Text>
              <Text style={styles.modalTexto}>Você completou a fase {fase}.</Text>
              <Text style={styles.modalTexto}>Forma: {nomesDasFormas[fase]}</Text>
              <TouchableOpacity style={styles.modalBotao} onPress={salvarImagem}>
                <Text style={styles.modalBotaoTexto}>Salvar Imagem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBotao} onPress={fecharModal}>
                <Text style={styles.modalBotaoTexto}>Próxima Fase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAE6',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#F8D26A',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  botaoVoltar: {
    position: 'absolute',
    left: 20,
    top: 30,
    padding: 10,
  },
  voltarTexto: {
    fontSize: 20,
    color: '#fff',
  },
  svg: {
    marginTop: 80,
  },
  paleta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7F6F2',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  botaoCor: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  falhaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  falhaTexto: {
    fontSize: 24,
    color: 'red',
  },
  botao: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTexto: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  modalBotao: {
    backgroundColor: '#FFB300',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#fff',
    fontSize: 18,
  },
});
