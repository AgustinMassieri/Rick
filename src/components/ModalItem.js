import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../screens/MainStyles.js';

const ModalItem = ({setShowModal, characterCurrent}) => {

    return(
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
                <Text style={styles.modalExit} onPress={() => setShowModal(false)}>X</Text>
                <Text style={styles.modalCharacterName}>{characterCurrent.name}</Text>
                <Image style={styles.image2} source={{uri: characterCurrent.image}}></Image>
                <Text style={styles.button}>{characterCurrent.status}</Text>
                <Text style={styles.modalCharacterDescription}>Species: <Text style={styles.boldFont}>{characterCurrent.species}</Text></Text>          
                {characterCurrent.type && (
                    <Text style={styles.modalCharacterDescription}>Type: <Text style={styles.boldFont}>{characterCurrent.type}</Text></Text>
                )}
                <Text style={styles.modalCharacterDescription}>Gender: <Text style={styles.boldFont}>{characterCurrent.gender}</Text></Text>
                {characterCurrent.comment && (
                    <Text style={styles.modalCharacterDescription}>Comment: <Text style={styles.boldFont}>{characterCurrent.comment}</Text></Text>
                )}
            </View>
        </View>
    )
}

export default ModalItem;