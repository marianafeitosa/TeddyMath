// Importando as funções necessárias do SDK Firebase
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Certifique-se de que o AsyncStorage está instalado
import { getFirestore } from "firebase/firestore"; // Importação do Firestore
import { getAnalytics } from "firebase/analytics";


// Configurações do seu aplicativo Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADYtObr-yGAXg8PL5_GSudBr9F6_RPrJU",
  authDomain: "teddymath-16ca5.firebaseapp.com",
  projectId: "teddymath-16ca5",
  storageBucket: "teddymath-16ca5.appspot.com",
  messagingSenderId: "650522847341",
  appId: "1:650522847341:web:459b577bd4f5014460f764",
  measurementId: "G-5G2XFJ35BB"
};

// Inicialize o Firebase App
const app = initializeApp(firebaseConfig);

// Inicialize o Auth com tratamento para persistência
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  if (error.code !== 'auth/already-initialized') {
    throw error; // Re-throw any other error
  }
}

const saveChildData = async (nome, genero, idade) => {
  try {
    const docRef = await addDoc(collection(db, 'Criancas'), {
      nome: nome,
      genero: genero,
      idade: idade,
    });
  
    console.log('Documento escrito com ID: ', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar documento: ', e);
  }
};

// Exporta as funções necessárias
export { db, auth, saveChildData };
// Inicialize o Analytics (opcional)
const analytics = getAnalytics(app);

// Inicialize o Firestore
const db = getFirestore(app);
