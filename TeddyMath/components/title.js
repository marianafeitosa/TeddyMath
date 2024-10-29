import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const Title = ()=> {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzler</Text>
    </View>
  );
}


export default Title;

const styles = StyleSheet.create({
    title:{
        fontSize: 36,
        fontWeight:'600',
    },
    container:{
        paddingVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})