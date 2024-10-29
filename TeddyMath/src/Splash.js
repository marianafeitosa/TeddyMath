import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground, Animated } from 'react-native';

const Splash = ({ navigation }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [fadeAnimLogo1] = useState(new Animated.Value(0));
  const [fadeAnimLogo2] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    Animated.timing(fadeAnimLogo1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimLogo2, {
      toValue: 1,
      duration: 2000,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const loadingWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground
      source={require('../assets/BackgroundSplash.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/logo1.png')}
          style={[styles.logo1, { opacity: fadeAnimLogo1 }]}
        />
        <View style={styles.loadingContainer}>
          <Animated.View style={[styles.loadingBar, { width: loadingWidth }]} />
        </View>
        <Animated.Image
          source={require('../assets/logo2.png')}
          style={[styles.logo2, { opacity: fadeAnimLogo2 }]}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo1: {
    width: 350,
    height: 150,
    marginBottom: 120,
  },
  loadingContainer: {
    width: 200,
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#9CDAC7',
    borderRadius: 10,
  },
  logo2: {
    width: 450,
    height: 450,
    marginBottom: -120,
  },
  versionText: {
    fontSize: 12,
    color: '#AAA',
    position: 'absolute',
    bottom: 10,
  },
});

export default Splash;
