import React, {useEffect} from 'react';
import {Text, Modal, SafeAreaView, FlatList, Image, TouchableOpacity, View} from 'react-native';
import styles from './MainStyles.js';
import FlatListItem from '../components/FlatListItem.js';
import ModalItem from '../components/ModalItem.js';
import ModalComment from '../components/ModalComment.js';
import { auth, db } from '../../config/firebase';
import { collection, onSnapshot, query, deleteDoc, doc, where } from "firebase/firestore";
import { setFavouriteCharactersList, emptyFavouriteCharactersList, setShowCommentModal, setCurrentCharacter } from '../store/slices/characters/index.js';
import { useDispatch, useSelector } from 'react-redux';

const Favorites = ({navigation}) => {

    const dispatch = useDispatch();
    const { favoriteCharacters, showCharacterModal, showCommentModal } = useSelector(state => state.characters);

    useEffect(() => {
        getData();
    }, []);

    getData = async() => {
        dispatch(emptyFavouriteCharactersList());
    
        const q = query(collection(db, "Characters"), where("userId", "==", auth.currentUser.uid));        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const aux2 = [];
            querySnapshot.docs.forEach( (doc) => {
                const aux = doc.data()
                aux2.push(aux);
            });
            dispatch(setFavouriteCharactersList(aux2));
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
            <View style={styles.character_container}>
                <FlatListItem item={item}/>
                <TouchableOpacity onPress={ () => deleteFavCharacter(item)}>
                    <Image style={{position: 'absolute', marginLeft: '20%', width: 20, height: 25, resizeMode: 'contain'}} source={require('../../papelera.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => {dispatch(setShowCommentModal(true)); dispatch(setCurrentCharacter(item))}}>
                    <Image style={{position: 'absolute', marginLeft: '40%', width: 20, height: 25, resizeMode: 'contain'}} source={require('../../comment.png')}/>
                </TouchableOpacity>
            </View>           
        )
      }

    return(
        <SafeAreaView style={styles.container}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, marginTop: '4%'}}> Favorites </Text>
            <FlatList
                style={styles.flatlist_style}
                keyExtractor={(item, index) => item.id }
                numColumns={2}
                columnWrapperStyle={styles.row}
                data={favoriteCharacters}
                renderItem={renderItem}
            />

            <Modal transparent={true} visible={showCharacterModal} animationType="slide">
                <ModalItem/>
            </Modal>

            <Modal transparent={true} visible={showCommentModal} animationType="slide">
                <ModalComment/>
            </Modal>
        </SafeAreaView>
    )
}

export default Favorites;