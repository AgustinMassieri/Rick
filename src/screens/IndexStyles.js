import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    subtitle:{
      fontStyle: 'italic',
      color: 'white',
      marginBottom: '8%'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#444444',
      color: 'whtie',
    },
    buttonEnter: {
      fontWeight: 'bold', 
      color: 'white', 
      borderColor: 'white', 
      borderStyle: 'solid',
      borderWidth: 2,
      padding: 10,
      borderRadius: 4,
      fontSize: 20
    },
    input: {
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      margin: 10,
      fontSize: 20,
      width: 250,
      color: 'white',
    },
    button: {
      borderColor: 'white',
      borderWidth: 2,
      padding: 5,
      margin: 20,
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
    },
    messageNotOk: {
      color: '#FF0000', 
      marginTop: '2%', 
      fontSize: 18,
      textAlign: 'center'
    },
    messageOk: {
      color: 'lightgreen', 
      marginTop: '2%', 
      fontSize: 18
    }
});

export default styles;