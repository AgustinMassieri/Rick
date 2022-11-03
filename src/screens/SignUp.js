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

  signUpUser = () =>{
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        setSuccessfulRegister(true);
        setErrorMailAlreadyInUse(false);
        setErrorInvalidEmail(false);
    }).catch((err) => {
        if (err.code == 'auth/email-already-in-use'){
            setSuccessfulRegister(false);
            setErrorMailAlreadyInUse(true);
            setErrorInvalidEmail(false);
        }else if (err.code == 'auth/invalid-email') {
            setSuccessfulRegister(false);
            setErrorMailAlreadyInUse(false);
            setErrorInvalidEmail(true);
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
        {successfulRegister && (<Text style={{color: 'green'}}> Su usuario se genero de forma correcta! </Text>)}
        {errorMailAlreadyInUse && (<Text style={{color: 'red'}}> El mail ingresado ya esta en uso! </Text>)}
        {errorInvalidEmail && (<Text style={{color: 'red'}}> El mail ingresado no es valido! </Text>)}
    </SafeAreaView>
  );
}

export default SignUp;