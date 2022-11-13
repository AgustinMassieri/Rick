import React from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from '../screens/MainStyles.js';
import { setShowCharacterModal, setCurrentCharacter } from '../store/slices/characters/index.js';

const FlatListItem = ({item}) => {

    const dispatch = useDispatch();

    return (
        <SafeAreaView >
            <TouchableOpacity onPress={() => {
                dispatch(setCurrentCharacter(item));
                dispatch(setShowCharacterModal(true));
                }}>
                <Text style={styles.texto}>{item.name}</Text>
                <Image style={styles.image} source={{uri: item.image}} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default FlatListItem;