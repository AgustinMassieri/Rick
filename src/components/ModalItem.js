import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../screens/MainStyles.js';
import { setShowCharacterModal } from '../store/slices/characters/index.js';
import { useDispatch, useSelector } from 'react-redux';


const ModalItem = () => {

    const dispatch = useDispatch();
    const { currentCharacter } = useSelector(state => state.characters);

    return(
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
                <Text style={styles.modalExit} onPress={() => dispatch(setShowCharacterModal(false))}>X</Text>
                <Text style={styles.modalCharacterName}>{currentCharacter.name}</Text>
                <Image style={styles.image2} source={{uri: currentCharacter.image}}></Image>
                <Text style={styles.button}>{currentCharacter.status}</Text>
                <Text style={styles.modalCharacterDescription}>Species: <Text style={styles.boldFont}>{currentCharacter.species}</Text></Text>          
                {currentCharacter.type && (
                    <Text style={styles.modalCharacterDescription}>Type: <Text style={styles.boldFont}>{currentCharacter.type}</Text></Text>
                )}
                <Text style={styles.modalCharacterDescription}>Gender: <Text style={styles.boldFont}>{currentCharacter.gender}</Text></Text>
                {currentCharacter.comment && (
                    <Text style={styles.modalCharacterDescription}>Comment: <Text style={styles.boldFont}>{currentCharacter.comment}</Text></Text>
                )}
            </View>
        </View>
    )
}

export default ModalItem;