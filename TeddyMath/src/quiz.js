import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import database from '@react-native-firebase/database';
import { getFirestore } from "firebase/firestore"; // Mantida apenas uma vez
import { getAnalytics } from "firebase/analytics";

const Quiz = ({ navigation }) => {
  const questions = [
    {
      question: "Informe o resultado correto da soma: ",
      operation: "12 + 10",
      incorrect_answers: ["20", "21", "19"],
      correct_answer: "22"
    },
    {
      question: "Informe o resultado correto da subtração: ",
      operation: "15 - 6",
      incorrect_answers: ["10", "9", "7"],
      correct_answer: "9"
    },
    {
      question: "Informe o resultado correto da multiplicação:",
      incorrect_answers: ["16", "14", "13"],
      operation: "5 x 3",
      correct_answer: "15"
    },
    {
      question: "Informe o resultado correto da divisão:",
      incorrect_answers: ["6", "4", "3"],
      operation: "20 ÷ 4",
      correct_answer: "5"
    },
    {
      question: "Informe o resultado correto da soma",
      incorrect_answers: ["16", "17", "18"],
      operation: "8 + 7",
      correct_answer: "15"
    },
    {
      question: "Informe o resultado correto da subtração:",
      incorrect_answers: ["8", "9", "10"],
      operation: "18 - 9",
      correct_answer: "11"
    },
    {
      question: "Informe o resultado correto da multiplicação:",
      incorrect_answers: ["9", "10", "11"],
      operation: "6 x 2",
      correct_answer: "12"
    },
    {
      question: "Informe o resultado correto da divisão:",
      incorrect_answers: ["4", "5", "7"],
      operation: "36 ÷ 6",
      correct_answer: "6"
    },
    {
      question: "Informe o resultado correto da soma:",
      incorrect_answers: ["12", "13", "15"],
      operation: "9 + 7",
      correct_answer: "16"
    },
    {
      question: "Informe o resultado da subtração:",
      incorrect_answers: ["12", "13", "15"],
      operation: "22 - 8",
      correct_answer: "14"
    },
  ];

  const [quesIndex, setQuesIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[quesIndex];
  const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correct_answer) {
      const newScore = score + 10;
      setScore(newScore);
      Alert.alert("Correct!", "Good job!", [
        { text: "OK", onPress: () => handleNext() },
      ]);
    } else {
      Alert.alert("Incorrect", "Try again!", [
        { text: "OK", onPress: () => handleNext() },
      ]);
    }
  };

  const handleNext = () => {
    if (quesIndex < questions.length - 1) {
      setQuesIndex(quesIndex + 1);
      setSelectedAnswer(null);
    } else {
      saveScore();
      navigation.navigate('ResultQuiz', { score, total: questions.length });
    }
  };

  const saveScore = async () => {
    try {
      await database().ref('teddymath-16ca5/scores').push({
        score: score,
        date: new Date().toISOString(),
      });
      Alert.alert("Score saved!", "Your score has been saved.");
    } catch (error) {
      console.error("Error saving score: ", error);
      Alert.alert("Error", "Could not save your score.");
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleEnd = () => {
    navigation.navigate('SplashQuiz');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>Pergunta {quesIndex + 1} de {questions.length}</Text>
        <Text style={styles.score}>Pontuação: {score}</Text>
      </View>

      {questions.length > 0 && (
        <View style={styles.parent}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          <Text style={styles.operation}>{currentQuestion.operation}</Text>
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  index === 0 && styles.optionButton1,
                  index === 1 && styles.optionButton2,
                  index === 2 && styles.optionButton3,
                  index === 3 && styles.optionButton4,
                  selectedAnswer === option && { backgroundColor: '#FF6F61' } // Cor ao selecionar
                ]}
                onPress={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.option}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1DC',
    padding: 20,
  },
  parent: {
    flex: 1,
    backgroundColor: '#72BFC7',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#FFBE78',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 20,
    color: '#A1A1A1',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  score: {
    fontSize: 16,
    color: '#5B5B5B',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B5B5B',
    textAlign: 'center',
    marginBottom: 16,
  },
  operation: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    marginVertical: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton1: {
    backgroundColor: '#9CDBC8',
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  optionButton2: {
    backgroundColor: '#FFAEBC',
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  optionButton3: {
    backgroundColor: '#FBE2A4',
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  optionButton4: {
    backgroundColor: '#D4A5A5',
    paddingVertical: 20,
    paddingHorizontal: 30,
    margin: 10,
    borderRadius: 15,
    width: '40%',
    alignItems: 'center',
  },
  option: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#FF6F61',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
