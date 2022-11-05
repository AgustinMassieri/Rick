import React, {useEffect, useState} from 'react';
import {Text, Modal, SafeAreaView, FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './MainStyles.js';
import FlatListItem from '../components/FlatListItem.js';
import ModalItem from '../components/ModalItem.js';
import ModalComment from '../components/ModalComment.js';
import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, query, deleteDoc, doc, where } from "firebase/firestore";
import { TextInput } from 'react-native-paper';

const Favorites = ({navigation}) => {

    const [characters, setCharacters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [characterCurrent, setCharacterCurrent] = useState("");
    const [showCommentModal, setShowCommentModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    getData = async() => {
        setCharacters([]);
    
        const q = query(collection(db, "Characters"), where("userId", "==", auth.currentUser.uid));
        const aux2 = [];
        
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.docs.forEach( (doc) => {
                const aux = doc.data()
                aux2.push(aux);
            });
            setCharacters(aux2);
        });        
    }; 

    async function deleteFavCharacter (item){
        try {
          const docRef = await deleteDoc(doc(db, "Characters", item.name+' - '+auth.currentUser.uid));
          getData();
         } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    renderItem = ({item}) => {
        return(
            <View>
                <FlatListItem item={item} 
                            setCharacterCurrent={setCharacterCurrent} 
                            setShowModal={setShowModal}
                            />
                <TouchableOpacity onPress={ () => deleteFavCharacter(item)}>
                    <Image style={{position: 'absolute', marginLeft: '20%', width: 20, height: 25, resizeMode: 'contain'}} source={require('../../papelera.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => setShowCommentModal(true)}>
                    <Image style={{position: 'absolute', marginLeft: '40%', width: 20, height: 25, resizeMode: 'contain'}} source={require('../../comment.png')}/>
                </TouchableOpacity>
            </View>           
        )
      }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}> Favorites </Text>
            <FlatList
                style={{marginTop: 10, marginBottom:60}}
                keyExtractor={(item, index) => item.id }
                numColumns={2}
                columnWrapperStyle={styles.row}
                data={characters}
                renderItem={renderItem}
            />

            <Modal transparent={true} visible={showModal} animationType="slide">
                <ModalItem setShowModal={setShowModal} characterCurrent={characterCurrent}/>
            </Modal>

            <Modal transparent={true} visible={showCommentModal} animationType="slide">
                <ModalComment setShowCommentModal={setShowCommentModal}/>
            </Modal>
        </SafeAreaView>
    )
}

export default Favorites;