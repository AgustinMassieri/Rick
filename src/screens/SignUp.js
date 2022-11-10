import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import styles from './IndexStyles.js'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [errorMailAlreadyInUse, setErrorMailAlreadyInUse] = useState(false);
  const [errorInvalidEmail, setErrorInvalidEmail] = useState(false);
  const [errorWeakPassword, setErrorWeakPassword] = useState(false);

  signUpUser = () =>{
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        setSuccessfulRegister(true);
        setErrorMailAlreadyInUse(false);
        setErrorInvalidEmail(false);
        setErrorWeakPassword(false);
    }).catch((err) => {
        if (err.code == 'auth/email-already-in-use'){
          setSuccessfulRegister(false);
          setErrorMailAlreadyInUse(true);
          setErrorInvalidEmail(false);
          setErrorWeakPassword(false);
        }else if (err.code == 'auth/invalid-email') {
          setSuccessfulRegister(false);
          setErrorMailAlreadyInUse(false);
          setErrorInvalidEmail(true);
          setErrorWeakPassword(false);
        }else if (err.code == 'auth/weak-password') {
          setSuccessfulRegister(false);
          setErrorMailAlreadyInUse(false);
          setErrorInvalidEmail(false);
          setErrorWeakPassword(true);
      }
    })
  }

  return (
    <SafeAreaView style={styles.container}>
        <TextInput style={styles.input} placeholder='Email:' placeholderTextColor="white" value={email} onChangeText={ (value) => setEmail(value) }/>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Password:' placeholderTextColor="white" value={password} onChangeText={ (value) => setPassword(value) }/>
        <TouchableOpacity onPress={signUpUser}>
            <Text style={styles.button}>Sign up!</Text>
        </TouchableOpacity>
        {successfulRegister && (<Text style={styles.signUpOk}> Su usuario se genero de forma correcta! </Text>)}
        {errorMailAlreadyInUse && (<Text style={styles.errorSignUp}> El mail ingresado ya esta en uso! </Text>)}
        {errorInvalidEmail && (<Text style={styles.errorSignUp}> El mail ingresado no es valido! </Text>)}
        {errorWeakPassword && (<Text style={styles.errorSignUp}> La contraseña debe tener al menos 6 caracteres!</Text>)}
    </SafeAreaView>
  );
}

export default SignUp;