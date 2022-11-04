import React, { useEffect, useState } from 'react';
import { FlatList, Modal, SafeAreaView, TextInput, Text, Image, Animated } from 'react-native';
import AccordionItem from '../components/AccordionItem.js';
import FiltersList from '../components/FilterList.js';
import ModalItem from '../components/ModalItem.js';
import styles from './MainStyles.js';
import RenderItem from '../components/RenderItem.js';
import { useFocusEffect } from '@react-navigation/native';


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

  const apiURL = 'https://rickandmortyapi.com/api/character/?page=' + pageCurrent + '&name=' + nameFilter + '&status=' + statusFilter + '&gender=' + genderFilter + '&type=' + typeFilter + '&species=' + speciesFilter;
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getData();
  }, [apiURL]);

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
      <Text style={{color:'white', fontWeight:'bold', fontSize: 25, marginTop: '2%'}} onPress={() => navigation.navigate('Favorites')}>
        <Image style={styles.star_img} source={require('../../star.png')}/>
        Favorites
      </Text>

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
        style={{marginTop: 10, marginBottom:60}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={ item => item.id }
        numColumns={2}
        columnWrapperStyle={styles.row}
        data={characters}
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