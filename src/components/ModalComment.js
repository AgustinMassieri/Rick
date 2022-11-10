import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { db, auth } from '../../config/firebase.js';
import styles from '../screens/MainStyles.js';

const ModalComment = ({setShowCommentModal, characterCurrent}) => {

    const [comment, setComment] = useState('');
    const [errorEmptyComment, setErrorEmptyComment] = useState(false);

    async function addComment (){
        try {
          if(comment == ''){
            setErrorEmptyComment(true);
          } else{
            const docRef = await updateDoc(doc(db, "Characters", characterCurrent.name+' - '+auth.currentUser.uid), {
                comment: comment
              });
              setComment('');
              setShowCommentModal(false);
              setErrorEmptyComment(false);
          }
          
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
                {errorEmptyComment && (<Text style={{color: '#FF0000', marginTop: '4%', fontSize: 18}}> Ingresa un comentario! </Text>)}
            </View>
        </View>
    )
}

export default ModalComment;