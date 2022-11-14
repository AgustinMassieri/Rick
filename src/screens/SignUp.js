import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import styles from './IndexStyles.js'
import { useDispatch, useSelector } from 'react-redux';
import { clearEmailAndPassword, setEmail, setPassword } from '../store/slices/users';

const SignUp = ({navigation}) => {

  const dispatch = useDispatch();
  const { email, password } = useSelector(state => state.users);

  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const [errorMailAlreadyInUse, setErrorMailAlreadyInUse] = useState(false);
  const [errorInvalidEmail, setErrorInvalidEmail] = useState(false);
  const [errorWeakPassword, setErrorWeakPassword] = useState(false);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearEmailAndPassword());
    });
    return unsubscribe;
  }, [navigation]);

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
        <TextInput style={styles.input} placeholder='Email:' placeholderTextColor="white" value={email} onChangeText={ (value) => dispatch(setEmail(value)) }/>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Password:' placeholderTextColor="white" value={password} onChangeText={ (value) => dispatch(setPassword(value)) }/>
        <TouchableOpacity onPress={signUpUser}>
            <Text style={styles.button}>Sign up!</Text>
        </TouchableOpacity>
        {successfulRegister && (<Text style={styles.signUpOk}>Su usuario se genero de forma correcta! </Text>)}
        {errorMailAlreadyInUse && (<Text style={styles.messageNotOk}>El mail ingresado ya esta en uso! </Text>)}
        {errorInvalidEmail && (<Text style={styles.messageNotOk}>El mail ingresado no es valido! </Text>)}
        {errorWeakPassword && (<Text style={styles.messageNotOk}>La contraseña debe tener al menos 6 caracteres!</Text>)}
    </SafeAreaView>
  );
}

export default SignUp;