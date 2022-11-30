import React, { memo } from 'react';
import { TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import FlatListItem from './FlatListItem';
import { db, auth } from '../../config/firebase';
import { setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState } from 'react';

const RenderItem = memo(({item, index, scrollY}) => {

    const { height } = Dimensions.get("screen");
    const [isFavourite, setIsFavourite] = useState(false);
    const [auxComment, setAuxComment] = useState('');

    async function characterAlreadyExists (item) {
      console.log('Entre ', item.name)
      const q = query(collection(db, "Characters"), where("userId", "==", auth.currentUser.uid));        
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const aux2 = [];
          querySnapshot.docs.forEach( (doc) => {
              const aux = doc.data()
              if(aux.name == item.name){
                console.log(aux.comment);
                setAuxComment(aux.comment);
              }
              
          });
          
      });        
  };

    async function addFavCharacter (item){
        
        try {
          const docRef = await setDoc(doc(db, "Characters", item.name+' - '+auth.currentUser.uid), {
            id: item.id,
            name: item.name,
            species: item.species,
            status: item.status,
            type: item.type,
            gender: item.gender,
            image: item.image,
            userId: auth.currentUser.uid,
            comment: auxComment,
            isActive: 'true'
          });
          setIsFavourite(true);
         } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    async function deleteFavCharacter (item){
      try {
        //const docRef = await deleteDoc(doc(db, "Characters", item.name+' - '+auth.currentUser.uid));
        const docRef = await updateDoc(doc(db, "Characters", item.name+' - '+auth.currentUser.uid), {
          isActive: 'false'
        });
        setIsFavourite(false);
       } catch (e) {
        console.error("Error adding document: ", e);
      }
    }   
    spinValue = new Animated.Value(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
    const spin = this.spinValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','360deg']
    })
    const inputRange = [
      -1,
      0,
      (height * 0.1 + 1) * index,
      (height * 0.3 + 1) * (index + 3),
    ];
    const scale = 1;
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const Offset = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 500],
    });

    const q = query(collection(db, "Characters"), where("name", "==", item.name));
    onSnapshot(q, (querySnapshot) => {
      let flag = false;
      querySnapshot.docs.forEach( (doc) => {
        if ( (doc.data().userId == auth.currentUser.uid) && (doc.data().isActive == 'true') ){
          setIsFavourite(true);
          flag = true;
        }    
      })
      if(flag == false){
        setIsFavourite(false);
      }
    });    

    return(
      <Animated.View style={{
        transform: [{ scale: scale }, { translateX: Offset }],
        opacity: opacity,
      }}>
        <FlatListItem item={item}/>
        {(isFavourite == false) && ( 
          <TouchableOpacity onPress={ () => {characterAlreadyExists(item); addFavCharacter(item)}}>
            <Animated.Image style={{transform: [{rotate:spin}],
      marginLeft: '40%',
      position: 'fixed',
      width: 20,
      height:20}} source={require('../../fav_unselected.png')}/>
          </TouchableOpacity>
        )}
        {(isFavourite == true) && ( 
          <TouchableOpacity onPress={ () => deleteFavCharacter(item)}>
            <Animated.Image style={{transform: [{rotate:spin}],
      marginLeft: '40%',
      position: 'fixed',
      width: 20,
      height:20}} source={require('../../fav_selected.png')}/>
          </TouchableOpacity>
        )}
      </Animated.View>
    )

    
  })

export default RenderItem;