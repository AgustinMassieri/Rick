import React from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView, Vibration} from 'react-native';
import styles from './IndexStyles.js'

const Index = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>{ Vibration.vibrate(10*100000000); }}>
        <Image style={{resizeMode: "cover", height:100, width: 250}} source={require('../../logo3.png')} />
      </TouchableOpacity>
      <Text style={styles.subtitle}>By Joaquin Velazquez & Agustin Massieri</Text>
      <TouchableOpacity style={{marginBottom: '4%'}} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonEnter}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.buttonEnter}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Index;