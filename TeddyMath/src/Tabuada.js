import React, { useRef } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Animated, Platform} from 'react-native';

const data = [
  { id: '1', image: require('../assets/1.png') },
  { id: '2', image: require('../assets/2.png') },
  { id: '3', image: require('../assets/3.png') },
  { id: '4', image: require('../assets/4.png') },
  { id: '5', image: require('../assets/5.png') },
  { id: '6', image: require('../assets/6.png') },
  { id: '7', image: require('../assets/7.png') },
  { id: '8', image: require('../assets/8.png') },
  { id: '9', image: require('../assets/9.png') },
  { id: '10', image: require('../assets/10.png') },
];

const { width, height } = Dimensions.get('window');

export default function TabuadaScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCardPress = (itemId) => {
    console.log(`Card ${itemId} clicado!`);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const renderDots = () => {
    return data.map((_, index) => {
      const opacity = scrollX.interpolate({
        inputRange: [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp',
      });

      const scale = scrollX.interpolate({
        inputRange: [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ],
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={index.toString()}
          style={[styles.dot, { opacity, transform: [{ scale }] }]}
        />
      );
    });
  };

  return (
    <View style={styles.app}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={require('../assets/seta.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={[styles.title, styles.bold]}>Tabuada</Text>
        </View>
      </View>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item.id)} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.dotsContainer}>
        {renderDots()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 0,
    backgroundColor: '#FBF5E6',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '600',
    textTransform: 'uppercase',
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
    fontSize: Platform.select({ ios: 18, android: 20 }), // Ajuste de tamanho para Android e iOS
    color: '#817777',
    fontFamily: 'Poppins_700Bold',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    textTransform: 'none', // Garante que o texto não esteja em caixa alta
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.6,
  },
  card: {
    width: width * 0.7,
    height: width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.05,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    shadowColor: '#434343',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: -10,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD3A5',
    marginHorizontal: 5,
  },
});
