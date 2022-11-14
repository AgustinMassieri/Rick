import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import styles from './IndexStyles.js'
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, clearEmailAndPassword } from '../store/slices/users';

const SignIn = ({navigation}) => {

  const dispatch = useDispatch();
  const { email, password } = useSelector(state => state.users);

  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearEmailAndPassword());
    });
    return unsubscribe;
  }, [navigation]);
  
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
      <TextInput style={styles.input} placeholder='Email:' placeholderTextColor="white" value={email} onChangeText={ (value) => dispatch(setEmail(value))}/>
      <TextInput secureTextEntry={true} style={styles.input} placeholder='Password:' placeholderTextColor="white" value={password} onChangeText={ (value) => dispatch(setPassword(value)) }/>
      <TouchableOpacity onPress={signUpUser}>
        <Text style={styles.button}>Enter!</Text>
      </TouchableOpacity>
      {successfulLogin && (<Text style={styles.messageOk}>Login exitoso! </Text>)}
      {errorLogin && (<Text style={styles.messageNotOk}>Usuario incorrecto! </Text>)}
    </SafeAreaView>
  );
}

export default SignIn;
