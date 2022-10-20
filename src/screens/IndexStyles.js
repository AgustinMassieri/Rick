import { StyleSheet } from "react-native";

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
    buttonEnter: {
      fontWeight: 'bold', 
      color: 'white', 
      borderColor: 'white', 
      borderStyle: 'solid',
      borderWidth: 2,
      padding: 10,
      borderRadius: 4,
      fontSize: 20
    }
});

export default styles;