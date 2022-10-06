import React from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView, Vibration} from 'react-native';
import styles from './IndexStyles.js'

const Index = ({setShowIndex}) => {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=>{ Vibration.vibrate(10*100000000); }}>
        <Image style={{resizeMode: "cover", height:100, width: 250}} source={require('./logo3.png')} />
      </TouchableOpacity>
      <Text style={styles.subtitle}>By Joaquin Velazquez & Agustin Massieri</Text>
      <TouchableOpacity onPress={() => setShowIndex(false)}>
        <Text style={{fontWeight: 'bold', 
                      color: 'white', 
                      borderColor: 'white', 
                      borderStyle: 'solid',
                      borderWidth: 2,
                      padding: 10,
                      borderRadius: 4,
                      fontSize: 20}}>Enter!</Text>
      </TouchableOpacity>
    </SafeAreaView>
    )

}

export default Index;