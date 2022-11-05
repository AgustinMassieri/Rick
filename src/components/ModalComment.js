import React from 'react';
import { useState } from 'react';
import {View, Text, Image} from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from '../screens/MainStyles.js';

const ModalComment = ({setShowCommentModal}) => {

    const [comment, setComment] = useState('');

    return(
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
                <Text style={styles.modalExit} onPress={() => setShowCommentModal(false)}>X</Text>
                <TextInput style={{width: 300, height: 30, marginBottom: '3%', backgroundColor: '#585858'}} placeholder='Ingrese un comentario:' placeholderTextColor="white" value={comment} onChangeText={ (value) => setComment(value) }/>
                <Text style={{fontSize: 18, fontWeight: 'bold', borderColor: 'white', padding: 8, borderStyle: 'solid', borderWidth: 2, color: 'white'}}>Agregar comentario</Text>
            </View>
        </View>
    )
}

export default ModalComment;