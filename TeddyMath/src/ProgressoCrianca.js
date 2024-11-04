import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons'; // Biblioteca de ícones (instale usando `expo install @expo/vector-icons`)

const ProgressoCrianca = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho arredondado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="chevron-left" size={18} color="#6d5948" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="chevron-right" size={18} color="#6d5948" />
        </TouchableOpacity>
      </View>

      {/* Calendário */}
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#F4B400' },
        }}
        theme={{
          backgroundColor: '#FCFCFC',
          calendarBackground: '#FCFCFC',
          selectedDayBackgroundColor: '#F4B400',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#F4B400',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: '#6d5948',
          monthTextColor: '#6d5948',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14
        }}
        style={styles.calendar}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="home" size={24} color="#6d5948" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="users" size={24} color="#F4B400" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome name="cog" size={24} color="#6d5948" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  header: {
    backgroundColor: '#FBE2A4',
    height: 100, // Altura maior para caber o cabeçalho arredondado
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6d5948',
    textAlign: 'center',
  },
  navButton: {
    padding: 10,
  },
  calendar: {
    marginTop: 20,
  },
  footer: {
    position: 'absolute', // Coloca o footer acima da tela
    bottom: 0,
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 110, // Altura maior para se ajustar ao design do wireframe
    backgroundColor: '#FBE2A4',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 40,
  },
  iconButton: {
    padding: 10,
  },
});

export default ProgressoCrianca;
