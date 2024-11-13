// src/components/CustomText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ style, weight = 'normal', ...props }) => {
  const fontFamily = weight === 'bold' ? 'Poppins_700Bold' : 'Poppins_600SemiBold';

  return <Text style={[styles.default, { fontFamily }, style]} {...props} />;
};

const styles = StyleSheet.create({
  default: {
    color: '#817777', // Cor padrão
  },
});

export default CustomText;
