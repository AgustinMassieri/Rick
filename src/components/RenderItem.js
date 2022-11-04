import React, { memo } from 'react';
import { TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import FlatListItem from './FlatListItem';
import { db, auth } from '../../config/firebase';
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useState } from 'react';

const RenderItem = memo(({item, index, scrollY, setCharacterCurrent, setShowModal}) => {

    const { height } = Dimensions.get("screen");
    const [isFavourite, setIsFavourite] = useState(false);

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
            userId: auth.currentUser.uid
          });
          setIsFavourite(true);
         } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    async function deleteFavCharacter (item){
      try {
        const docRef = await deleteDoc(doc(db, "Characters", item.name+' - '+auth.currentUser.uid));
        setIsFavourite(false);
       } catch (e) {
        console.error("Error adding document: ", e);
      }
    }   

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
        if ( doc.data().userId == auth.currentUser.uid ){
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
        <FlatListItem item={item} 
                    setCharacterCurrent={setCharacterCurrent} 
                    setShowModal={setShowModal}
                    />
        {(isFavourite == false) && ( 
          <TouchableOpacity onPress={ () => addFavCharacter(item)}>
            <Image style={{marginLeft: '40%' ,position: 'fixed', width: 20, height:20}} source={require('../../fav_unselected.png')}/>
          </TouchableOpacity>
        )}
        {(isFavourite == true) && ( 
          <TouchableOpacity onPress={ () => deleteFavCharacter(item)}>
            <Image style={{marginLeft: '40%' ,position: 'fixed', width: 20, height:20}} source={require('../../fav_selected.png')}/>
          </TouchableOpacity>
        )}
      </Animated.View>
    )
  })

export default RenderItem;