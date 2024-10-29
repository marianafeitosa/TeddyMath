import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from './firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';


const ResultQuiz = ({ route, navigation }) => {
  const { score, total } = route.params;

  useEffect(() => {
    const saveScore = async () => {
      try {
        await addDoc(collection(db, 'scores'), {
          score,
          total: total * 10,
          timestamp: new Date(),
        });
        console.log("Score saved!");
      } catch (error) {
        console.error("Error saving score: ", error);
      }
    };

    saveScore();
  }, [score, total]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>Your Score: {score} / {total * 10}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("SplashQuiz")} style={styles.button}>
        <Text style={styles.buttonText}>Volte para a home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
