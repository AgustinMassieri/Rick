import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
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
            <View  style={styles.comment_modal} >
                <Text style={styles.modalExit} onPress={() => setShowCommentModal(false)}>X</Text>
                <TextInput style={styles.comment_input_text} placeholder='Ingrese un comentario:' placeholderTextColor="white" value={comment} onChangeText={ (value) => setComment(value) }/>
                <TouchableOpacity onPress={addComment}>
                    <Text style={styles.comment_btn_text}>Agregar comentario</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
}

export default ModalComment;