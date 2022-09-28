import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Vibration} from 'react-native';

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

const styles = StyleSheet.create({
  subtitle:{
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    color: 'whtie',
  },

});