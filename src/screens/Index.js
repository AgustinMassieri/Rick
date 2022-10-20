import React from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView, Vibration} from 'react-native';
import styles from './IndexStyles.js'

const Index = ({setShowIndex}) => {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>{ Vibration.vibrate(10*100000000); }}>
        <Image style={{resizeMode: "cover", height:100, width: 250}} source={require('../../logo3.png')} />
      </TouchableOpacity>
      <Text style={styles.subtitle}>By Joaquin Velazquez & Agustin Massieri</Text>
      <TouchableOpacity onPress={() => setShowIndex(false)}>
        <Text style={styles.buttonEnter}>Enter!</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Index;