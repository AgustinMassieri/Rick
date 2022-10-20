import React from 'react';
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import styles from '../screens/MainStyles.js';

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