import React, { useEffect, useState, useRef } from "react";
import { Button, Dialog, Portal, Text, Title, Provider as PaperProvider } from "react-native-paper"; 
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView , Platform } from "react-native"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 
import { db, auth } from './firebaseConfig'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Importação de Firestore

const { width } = Dimensions.get('window'); 

const imagens = [
  { id: 1, type: "Circulo", src: require('../assets/forma-circulo.png') },
  { id: 2, type: "Quadrado", src: require('../assets/forma-quadrado.png') },
  { id: 3, type: "Triangulo", src: require('../assets/forma-triangulo.png') },
  { id: 4, type: "Losango", src: require('../assets/forma-losango.png') },
  { id: 5, type: "Estrela", src: require('../assets/forma-estrela.png') }
];

function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function App() {
  const [cards, setCards] = useState(() => shuffleCards(imagens.concat(imagens)));
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0); 
  const [bestScore, setBestScore] = useState(Number.POSITIVE_INFINITY);
  const timeout = useRef(null);
  const navigation = useNavigation(); 

  const [timeLeft, setTimeLeft] = useState(25); 
  const [gameCompleted, setGameCompleted] = useState(false); 

  const disable = () => setShouldDisableAllCards(true);
  const enable = () => setShouldDisableAllCards(false);




  
  // Função para salvar pontuação no Firestore
  const saveScoreToFirestore = async (score) => {
    try {
      await addDoc(collection(db, 'scores'), {
        score: score,           // Pontuação atual
        total: 100,             // Total (adapte conforme necessário)
        timestamp: serverTimestamp(), // Data e hora atual
        jogo: "JogoDaMemoria"    // Nome do jogo adicionado
      });
      console.log('Pontuação salva com sucesso no Firestore!');
    } catch (error) {
      console.error('Erro ao salvar pontuação no Firestore: ', error);
    }
  };

  // Verificação após o timer chegar a 0
  useEffect(() => {
    if (timeLeft === 0 && !gameCompleted) {
      setShouldDisableAllCards(true);
      saveScoreToFirestore(score); // Salvar pontuação independentemente do valor
      navigation.navigate('TelaTenteNovamente', { score });
    }
  }, [timeLeft, gameCompleted, score, navigation]);
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const checkCompletion = async () => {
    if (Object.keys(clearedCards).length === imagens.length) {
      setGameCompleted(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      await AsyncStorage.setItem("bestScore", JSON.stringify(highScore));
      
      // Navega imediatamente para a tela de Parabéns, ignorando o timer
      saveScoreToFirestore(score); // Salva a pontuação atual no Firestore
      navigation.navigate('TelaParabens', { score });
    }
  };
  
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      setScore((prevScore) => prevScore + 20);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    // Se já houver uma carta aberta, impede que a mesma seja selecionada como par
    if (openCards.length === 1 && openCards[0] === index) {
      return;
    }
  
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };
  

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  useEffect(() => {
    const getBestScore = async () => {
      const score = await AsyncStorage.getItem("bestScore");
      if (score !== null) {
        setBestScore(JSON.parse(score));
      }
    };
    getBestScore();
  }, []);

  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(clearedCards[card.type]);

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    setScore(0); 
    setShouldDisableAllCards(false);
    setCards(shuffleCards(imagens.concat(imagens)));
    setTimeLeft(25); 
    setGameCompleted(false);
  };

  const handleBack = () => {
    navigation.goBack(); 
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
      <View style={styles.App}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={require('../assets/seta.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Title style={styles.title}>Caça Formas</Title>
          </View>
        </View>

        <View style={styles.timerScoreWrapper}>
          <View style={styles.timerWrapper}>
            <Image source={require('../assets/timer.png')} style={styles.timerIcon} />
            <Text style={styles.timerText}>{`00:${timeLeft.toString().padStart(2, '0')}`}</Text>
          </View>
          <Text style={styles.scoreText}>Pontuação: {score}</Text> 
        </View>

        <View style={styles.container}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.card, 
                checkIsFlipped(index) || checkIsInactive(card) ? styles.flipped : styles.hidden
              ]}
              onPress={() => handleCardClick(index)}
              disabled={shouldDisableAllCards || checkIsInactive(card)}
            >
              <Image style={styles.cardImage} source={checkIsFlipped(index) || checkIsInactive(card) ? card.src : require('../assets/frente-urso.png')} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const AppWrapper = () => (
  <PaperProvider>
    <App />
  </PaperProvider>
);

const styles = StyleSheet.create({
  bold: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  App: {
    flex: 1,
    padding: 0,
    backgroundColor: '#FBF5E6',
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    transform: [{ scale: 2.1 }],
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerWrapper: {
    width: '100%',
    backgroundColor: '#FBE2A4',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Platform.OS === 'ios' ? 'Poppins_700Bold' : 'Poppins_700Bold', // Ajuste a fonte se necessário
    fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal', // Android pode interpretar "bold" de forma diferente
    color: '#FFFFFF',
    marginTop: Platform.OS === 'android' ? 15 : 10, // Ajuste a margem para alinhamento
  },
  
  timerScoreWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    width: 30,
    height: 30,
    marginTop: 19, // Altera a margem superior para "abaixar" o ícone (aproximadamente 5 mm)
  },
  timerText: {
    fontSize: Platform.select({ ios: 18, android: 20 }), // Ajuste de tamanho para Android e iOS
    marginLeft: 10,
    marginTop: 19, // Altera a margem superior para "abaixar" o texto (aproximadamente 5 mm)
    fontFamily: 'Poppins_700Bold',
    color: '#817777',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    // Ajuste de alinhamento específico
    textAlign: 'left', // Alinha o texto à esquerda
  },
  scoreText: {
    fontSize: Platform.select({ ios: 18, android: 20 }), // Ajuste de tamanho para Android e iOS
    marginLeft: 10,
    marginTop: 19, // Altera a margem superior para "abaixar" o texto (aproximadamente 5 mm)
    fontFamily: 'Poppins_700Bold',
    color: '#817777',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    textAlign: 'left', // Alinha o texto à esquerda
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  card: {
    width: width / 3 - 20,
    height: width / 3 - 20,
    margin: 10,
    borderRadius: 15,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  flipped: {
    backgroundColor: 'transparent',
  },
  hidden: {
    backgroundColor: '#FBE2A4',
  }
});

export default AppWrapper;
