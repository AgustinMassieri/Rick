import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db, auth } from '../../config/firebase.js';
import styles from '../screens/MainStyles.js';
import { setInputCommentModal, setShowCommentModal } from '../store/slices/characters/index.js';

const ModalComment = () => {

    const dispatch = useDispatch();
    const { currentCharacter } = useSelector(state => state.characters);
    const [errorEmptyComment, setErrorEmptyComment] = useState(false);
    const [ auxComment, setAuxComment ] = useState(currentCharacter.comment);

    async function addComment (){
        
        try {
          if(auxComment == ''){
            setErrorEmptyComment(true);
          } else{
            const docRef = await updateDoc(doc(db, "Characters", currentCharacter.name+' - '+auth.currentUser.uid), {
                comment: auxComment
              });
              dispatch(setInputCommentModal(''));
              dispatch(setShowCommentModal(false));
              setErrorEmptyComment(false);
          }
          
         } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    return(
        <View style={styles.modalContainer}>
            <View  style={styles.comment_modal} >
                <Text style={styles.modalExit} onPress={() => dispatch(setShowCommentModal(false))}>X</Text>
                <TextInput style={styles.comment_input_text} placeholder='Ingrese un comentario:' placeholderTextColor="white" value={auxComment} onChangeText={ (value) => setAuxComment(value) }/>
                <TouchableOpacity onPress={addComment}>
                    <Text style={styles.comment_btn_text}>Agregar comentario</Text>
                </TouchableOpacity> 
                {errorEmptyComment && (<Text style={{color: '#FF0000', marginTop: '4%', fontSize: 18}}> Ingresa un comentario! </Text>)}
            </View>
        </View>
    )
}

export default ModalComment;