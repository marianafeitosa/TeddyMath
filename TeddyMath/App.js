import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/MyTabs'; 
import Splash from './src/Splash';
import CadastroNomeGenero from './src/CadastroNomeGenero';
import CadastroIdade from './src/CadastroIdade';
import Login from './src/Login';
import Security from './src/Security';
import Perfil from './src/Perfil';
import Signup from './src/Signup';
import MenuPrincipal from './src/MenuPrincipal'; 
import CreateProfileScreen from './src/CreateProfileScreen'; 
import WelcomeScreen from './src/WelcomeScreen'; 
import SplashQuiz from './src/SplashQuiz'; 
import SplashColore from './src/SplashColore';
import JogoColorir from './src/JogoColorir';
import Quiz from './src/quiz'; 
import ResultQuiz from './src/resultquiz'; 
import JogoDaMemoria from './src/JogoDaMemoria';
import TelaParabens from './src/TelaParabens';
import SplashJogodaMemoria from './src/SplashJogodaMemoria';
import TelaTenteNovamente from './src/TelaTenteNovamente';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Security" component={Security} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroNomeGenero" component={CadastroNomeGenero} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroIdade" component={CadastroIdade} options={{ headerShown: false }} />
        <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} options={{ headerShown: false }} /> 
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MyTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} /> 
        
        <Stack.Screen name="JogoColorir" component={JogoColorir} options={{ headerShown: false }} /> 
        <Stack.Screen name="SplashColore" component={SplashColore} options={{ headerShown: false }} />
        <Stack.Screen name="SplashQuiz" component={SplashQuiz} options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
        <Stack.Screen name="ResultQuiz" component={ResultQuiz} options={{ headerShown: false }} />

        <Stack.Screen 
          name="SplashJogodaMemoria" 
          component={SplashJogodaMemoria} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="JogoDaMemoria" 
          component={JogoDaMemoria} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TelaParabens" 
          component={TelaParabens} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TelaTenteNovamente" 
          component={TelaTenteNovamente} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
});
