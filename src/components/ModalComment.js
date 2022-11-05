import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-paper';
import { db, auth } from '../../config/firebase.js';
import styles from '../screens/MainStyles.js';

const ModalComment = ({setShowCommentModal, characterCurrent}) => {

    const [comment, setComment] = useState('');

    async function addComment (){
        try {
          const docRef = await updateDoc(doc(db, "Characters", characterCurrent.name+' - '+auth.currentUser.uid), {
            comment: comment
          });
         } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    return(
        <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
                <Text style={styles.modalExit} onPress={() => setShowCommentModal(false)}>X</Text>
                <TextInput style={{width: 300, height: 30, marginBottom: '3%', backgroundColor: '#585858'}} placeholder='Ingrese un comentario:' placeholderTextColor="white" value={comment} onChangeText={ (value) => setComment(value) }/>
                <TouchableOpacity onPress={addComment}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', borderColor: 'white', padding: 8, borderStyle: 'solid', borderWidth: 2, color: 'white'}}>Agregar comentario</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
}

export default ModalComment;