import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Index from './src/screens/Index.js';
import Main from './src/screens/Main.js';


const App = () => {

  const [showIndex, setShowIndex] = useState(true);

  return (

    <SafeAreaView style={styles.container}>
        
    {showIndex && (
      <Index setShowIndex={setShowIndex}></Index>
    )}

    {!showIndex && (
      <Main setShowIndex={setShowIndex}></Main>
    )}


    </SafeAreaView>
  )
};

export default App;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    color: 'whtie',
  },

})