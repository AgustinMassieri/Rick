import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import styles from './IndexStyles.js'

const SignIn = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  signUpUser = () =>{
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        setSuccessfulLogin(true);
        setErrorLogin(false);
        setTimeout(nextPage, 1000);
    }).catch((error) => {
        setSuccessfulLogin(false);
        setErrorLogin(true);
    });
  }

  function nextPage(){
    navigation.navigate('Main');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.input} placeholder='Email:' placeholderTextColor="white" value={email} onChangeText={ (value) => setEmail(value) }/>
      <TextInput secureTextEntry={true} style={styles.input} placeholder='Password:' placeholderTextColor="white" value={password} onChangeText={ (value) => setPassword(value) }/>
      <TouchableOpacity onPress={signUpUser}>
        <Text style={styles.button}>Enter!</Text>
      </TouchableOpacity>
      {successfulLogin && (<Text style={styles.messageOk}> Login exitoso! </Text>)}
      {errorLogin && (<Text style={styles.messageNotOk}> Usuario incorrecto! </Text>)}
    </SafeAreaView>
  );
}

export default SignIn;
