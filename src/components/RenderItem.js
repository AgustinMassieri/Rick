import React, { memo } from 'react';
import { TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import FlatListItem from './FlatListItem';
import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";

const RenderItem = memo(({item, index, scrollY, setCharacterCurrent, setShowModal}) => {

    const { height } = Dimensions.get("screen");

    async function addFavCharacter (item){
        try {
          const docRef = await setDoc(doc(db, "Characters", item.name), {
            id: item.id,
            name: item.name,
            species: item.species,
            status: item.status,
            type: item.type,
            gender: item.gender,
            image: item.image,
          });
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

    return(
      <Animated.View style={{
        transform: [{ scale: scale }, { translateX: Offset }],
        opacity: opacity,
      }}>
        <FlatListItem item={item} 
                    setCharacterCurrent={setCharacterCurrent} 
                    setShowModal={setShowModal}
                    />
        <TouchableOpacity onPress={ () => addFavCharacter(item)}>
            <Image style={{marginLeft: '40%' ,position: 'fixed', width: 20, height:20}} source={require('../../favorite.png')}/>
        </TouchableOpacity>
      </Animated.View>
    )
  })

export default RenderItem;