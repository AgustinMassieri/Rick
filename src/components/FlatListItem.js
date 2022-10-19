import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const FlatListItem = ({item, setCharacterCurrent, setShowModal}) => {

    return (
        <TouchableOpacity onPress={() => {
            setCharacterCurrent(item);
            setShowModal(true);
            }}>
            <Text style={styles.texto}>{item.name}</Text>
            <Image style={styles.image} source={{uri: item.image}} />
        </TouchableOpacity>
    )
}

export default FlatListItem;

const styles = StyleSheet.create({

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
      }
});