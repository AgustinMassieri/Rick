import React, { useEffect, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TextInput, Text, Image, Animated, TouchableOpacity, View } from 'react-native';
import AccordionItem from '../components/AccordionItem.js';
import FiltersList from '../components/FilterList.js';
import ModalItem from '../components/ModalItem.js';
import styles from './MainStyles.js';
import RenderItem from '../components/RenderItem.js';

const Main = ({navigation}) => {

  const [characters, setCharacters] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [characterCurrent, setCharacterCurrent] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [deleteEnable, setDeleteEnable] = useState(false);
  const [value, setValue] = useState(false);

  const apiURL = 'https://rickandmortyapi.com/api/character/?page=' + pageCurrent + '&name=' + nameFilter + '&status=' + statusFilter + '&gender=' + genderFilter + '&type=' + typeFilter + '&species=' + speciesFilter;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getData();
  }, [apiURL]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setValue(value=>!value);
    });
    return unsubscribe;
  }, [navigation]);

  getData = async() => {
    fetch(apiURL) 
      .then(response => response.json())
      .then(response => {
        setCharacters([...characters, ...response.results]);
      })
  };

  renderItem = ({item, index}) => {
    return(
      <RenderItem item={item} index={index} scrollY={scrollY} setCharacterCurrent={setCharacterCurrent} setShowModal={setShowModal} />
    )
  }

  handlerLoadMore = () =>{
    setPageCurrent(pageCurrent+1);
    setDeleteEnable(true);
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

      <AccordionItem setPageCurrent={setPageCurrent}
                     setStatusFilter={setStatusFilter} 
                     setGenderFilter={setGenderFilter} 
                     setTypeFilter={setTypeFilter} 
                     setSpeciesFilter={setSpeciesFilter}
                     setCharacters={setCharacters}
                     setNameFilter={setNameFilter}
                     deleteEnable={deleteEnable}
                     setDeleteEnable={setDeleteEnable}
                     statusFilter={statusFilter}
                     genderFilter={genderFilter}
                     typeFilter={typeFilter}
                     speciesFilter={speciesFilter}
                     />

      <TextInput style={styles.searchBar} value={nameFilter} onChangeText={ (value) => {setNameFilter(value); setPageCurrent(1); setCharacters([]); if(value.length == 0){setDeleteEnable(false)}else{setDeleteEnable(true)}} } placeholder='Search for characters by name ...'></TextInput>            
      
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
        extraData={value}
        renderItem={renderItem}
        onEndReached={handlerLoadMore}
      />

      <FiltersList statusFilter={statusFilter} 
                   genderFilter={genderFilter} 
                   typeFilter={typeFilter}
                   speciesFilter={speciesFilter}/>       

      <Modal transparent={true} visible={showModal} animationType="slide">
        <ModalItem setShowModal={setShowModal} characterCurrent={characterCurrent}/>
      </Modal>   
    </SafeAreaView>
  )
}

export default Main;