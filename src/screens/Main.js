import React, { useEffect, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TextInput, Text, Image, Animated, TouchableOpacity, View } from 'react-native';
import AccordionItem from '../components/AccordionItem.js';
import FiltersList from '../components/FilterList.js';
import ModalItem from '../components/ModalItem.js';
import styles from './MainStyles.js';
import RenderItem from '../components/RenderItem.js';
import { fetchCharacters, setCharactersList, incrementCurrentPage, resetCurrentPage, setNameFilter, setDeleteButtonEnable } from '../store/slices/characters/index.js';
import { useDispatch, useSelector } from 'react-redux';

const Main = ({navigation}) => {

  const dispatch = useDispatch();
  const { list: characters, showCharacterModal, currentPage, nameFilter, statusFilter, genderFilter, typeFilter, speciesFilter } = useSelector(state => state.characters);

  const [reRenderFlatListFlag, setReRenderFlatListFlag] = useState(false);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchCharacters(currentPage, nameFilter, statusFilter, genderFilter, typeFilter, speciesFilter));
  }, [currentPage, nameFilter, statusFilter, genderFilter, typeFilter, speciesFilter]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setReRenderFlatListFlag(reRenderFlatListFlag=>!reRenderFlatListFlag);
    });
    return unsubscribe;
  }, [navigation]);

  renderItem = ({item, index}) => {
    return(
      <RenderItem item={item} index={index} scrollY={scrollY}/>
    )
  }

  handlerLoadMore = () =>{
    dispatch(incrementCurrentPage());
    dispatch(setDeleteButtonEnable(true));
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.barra_favorites_text}>
          <Text style={styles.favorites_text}>
          <Image style={styles.star_img} source={require('../../star.png')}/>
            Favorites
          </Text>
        </View>
      </TouchableOpacity>

      <AccordionItem/>

      <TextInput style={styles.searchBar} value={nameFilter} onChangeText={ (value) => {dispatch(setNameFilter(value)); dispatch(resetCurrentPage()); dispatch(setCharactersList([])); if(value.length == 0){dispatch(setDeleteButtonEnable(false))}else{dispatch(setDeleteButtonEnable(true))}} } placeholder='Search for characters by name ...'></TextInput>            

      <Animated.FlatList
        style={styles.flatlist_style}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={ item => item.id }
        numColumns={2}
        columnWrapperStyle={styles.row}
        data={characters}
        extraData={reRenderFlatListFlag}
        renderItem={renderItem}
        onEndReached={handlerLoadMore}
      />

      <FiltersList/>       

      <Modal transparent={true} visible={showCharacterModal} animationType="slide">
        <ModalItem/>
      </Modal>   
      
    </SafeAreaView>
  )
}

export default Main;