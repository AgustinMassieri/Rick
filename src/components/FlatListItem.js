import React from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import styles from '../screens/MainStyles.js';


const FlatListItem = ({item, setCharacterCurrent, setShowModal}) => {

    return (
        <SafeAreaView >
            <TouchableOpacity onPress={() => {
                setCharacterCurrent(item);
                setShowModal(true);
                }}>
                <Text style={styles.texto}>{item.name}</Text>
                <Image style={styles.image} source={{uri: item.image}} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default FlatListItem;