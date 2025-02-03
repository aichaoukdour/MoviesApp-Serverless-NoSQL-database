import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user information to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password,
        createdAt: new Date(),
      });

      // Show success message
      Toast.show({
        type: 'success',
        text1: 'Account created',
        text2: 'Your account has been created.',
      });

      // Navigate to login screen after a short delay
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);

    } catch (error) {
      setError(error.message);
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: error.message,
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/download.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <View >
            {/* Logo */}
          </View>
        </View>
        <View style={styles.formContainer}>
        
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>You have already an account? Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Harmonized color
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker transparent background
    borderRadius: 20,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgb(138, 137, 136)', // Accent color
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgb(255, 255, 255)', // Harmonized input border color
    borderRadius: 5,
    color: '#fff', // Harmonized text color
    marginBottom: 10,
  },
  button: {
    width: '50%',
    padding: 15,
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
elevation: 5,
alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 55,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  link: {
    color: 'rgb(255, 255, 255)',
    marginTop: 20,
  },
});
