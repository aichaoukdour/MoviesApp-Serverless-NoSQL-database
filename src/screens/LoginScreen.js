import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ImageBackground 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Aucun compte trouvé avec cet email. Veuillez créer un compte.");
        return;
      }

      setEmail('');
      setPassword('');
      navigation.navigate("HomeTab");

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erreur de connexion',
        text2: error.message,
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/download.jpeg')} style={styles.background}>
      <View style={styles.container}>

        {/* Semi-transparent Card */}
        <View style={styles.card}>
          
          {/* Logo */}
           {/* Play Icon with Shadow */}
                  <View style={{
                    backgroundColor: "rgb(105, 6, 198)",
                    width: 50,
                    background: "linear-gradient(55deg,  rgb(254, 197, 241) 0%,rgb(255, 3, 196) 0%, rgb(98, 0, 255) 100%, rgba(105, 6, 198, 1) 50%)",
                    height: 50,
                    marginLeft:"40%",
                    marginTop:"-17%",
                    borderRadius: 35,
                    alignItems: "center",
                    justifyContent: "center",
                     // Lighter, blurred shadow
              shadowColor: "rgb(230, 58, 249)", // Light purple shadow color
              shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
              shadowOpacity: 0.8, // Lower opacity for a softer shadow
              shadowRadius: 20, // Increase radius to create a blurred shadow
              elevation: 5, // For Android, ensure shadow is visible
                  }}>
                    <Ionicons name="play" size={34} color="#fff" />
                  </View>
          

          {/* App Title */}
                 <Text style={{ color: "#fff", fontSize: 30, fontWeight: "bold",    marginLeft:"40%",letterSpacing: 0, marginTop: -7}}>
                   M<Text style={{ color: "rgb(142, 4, 185)", fontWeight: "bold" }}>\/</Text>
                 </Text>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="rgba(212, 199, 214, 0.78)" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#ccc"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color=" rgba(212, 199, 214, 0.78)" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#ccc"
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          {/* Signup Navigation */}
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.link}>You have no account? Sign up</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    marginTop:"20%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(188, 188, 188, 0.2)', // Semi-transparent effect
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(8, 4, 4, 0.65)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },


  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#F9AA33',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: "-10%",
    marginTop:"20%",
    backgroundColor: 'rgba(20, 17, 17, 0.38)',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  
    color: '#fff',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    background: "linear-gradient(55deg,  rgb(254, 197, 241) 0%,rgb(255, 3, 196) 0%, rgb(98, 0, 255) 100%, rgba(105, 6, 198, 1) 50%)",
    height: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
     // Lighter, blurred shadow
shadowColor: "rgb(255, 0, 234)", // Light purple shadow color
shadowOffset: { width: 1, height: 4 }, // Slightly offset shadow
shadowOpacity: 0.8, // Lower opacity for a softer shadow
shadowRadius: 20, // Increase radius to create a blurred shadow
elevation: 5, // For Android, ensure shadow is visible
padding: 10,
    alignItems: 'center',
  
    marginTop: "20%",
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight:'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: 'rgb(249, 249, 250)',
    marginTop: 20,
    textAlign: 'center',
  },
});

