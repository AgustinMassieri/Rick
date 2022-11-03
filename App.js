import React from 'react';
import {StyleSheet} from 'react-native';
import Index from './src/screens/Index.js';
import SignIn from './src/screens/SignIn.js';
import SignUp from './src/screens/SignUp.js';
import Main from './src/screens/Main.js';
import Favorites from './src/screens/Favourites.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Index" component={Index}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Favorites" component={Favorites}/>
      </Stack.Navigator>
    </NavigationContainer>        
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