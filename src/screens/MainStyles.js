import { StyleSheet } from "react-native";
import Index from "./Index";

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subtitle:{
      fontStyle: 'italic',
      color: 'white',
      marginBottom: 20
    },
    modalCard: {
      width: '70%',
      height: '43%',
      borderRadius: 30,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#585858',
    },
    modalExit:{
      top:'3%',
      marginLeft:'80%',
      fontSize: 30,
      color: 'white',
    },
    modalCharacterName:{
      marginBottom:10,
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold',
      textShadowColor: 'black',
      textShadowRadius: 5,
    },
    modalCharacterDescription: {
      fontSize: 18, 
      color: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#444444',
      color: 'whtie',
    },
    texto: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 10,
      color: 'white',
      width: 160,
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 40,
      marginBottom: 20,
      marginLeft:25,
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
    },
    image2: {
      width: '80%',
      height: '60%', 
      borderRadius: 10,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderStyle: 'solid',
      borderWidth: 1,
    },
    row: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#efefef',
      paddingHorizontal: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontSize: 18,
      position: 'absolute',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 1,
      right: 35,
      bottom:65
    },
    filteredBy: {
      marginRight:10, 
      color: 'white', 
      fontWeight: 'bold',
      fontSize: 18
    },
    searchBar: {
      borderRadius:10,
      borderColor: 'black', 
      borderStyle:'solid',
      borderWidth: 2, 
      backgroundColor:'white', 
      width: 250, 
      height: 30, 
      paddingLeft: 10,
      marginTop: 10
    },
    favorite_img: {
      marginLeft: '40%',
      position: 'fixed',
      width: 20,
      height:20
    },
    star_img: {
      width: 20,
      height:20,
    },
    input: {
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      margin: 10,
      fontSize: 20,
      width: 250,
      color: 'white',
    },
    flatlist_style: {
      marginBottom: '10%',
      marginLeft: '8%',
    },
    character_container: {
      marginTop: '10%'
    },
    comment_modal: {
      width: '80%',
      height: '20%',
      borderRadius: 30,
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#585858',
    },
    comment_input_text: {
      width: 300,
      height: 30,
      marginBottom: '3%',
      borderColor: 'white',
      backgroundColor: '#585858',
      color: 'white',
      fontSize: 18,
    },
    comment_btn_text: {
      fontSize: 18,
      fontWeight: 'bold',
      borderColor: 'white',
      padding: '3%',
      borderStyle: 'solid',
      borderWidth: 2,
      color: 'white',
    }
  });

export default styles;