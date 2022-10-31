import React, {useEffect, useState} from 'react';
import {FlatList, Modal, SafeAreaView, TextInput,Vibration, TouchableOpacity,Text, View, Image} from 'react-native';
import AccordionItem from '../components/AccordionItem.js';
import FiltersList from '../components/FilterList.js';
import FlatListItem from '../components/FlatListItem.js';
import ModalItem from '../components/ModalItem.js';
import styles from './MainStyles.js';
import { db } from '../../config/firebase';
import { setDoc, doc } from "firebase/firestore";

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

  renderItem = ({item}) => {
    return(
      <View>
      <FlatListItem item={item} 
                  setCharacterCurrent={setCharacterCurrent} 
                  setShowModal={setShowModal}
                  />
        <TouchableOpacity onPress={ () =>{Vibration.vibrate();addFavCharacter(item)} }>
          <Image style={styles.favorite_img} 
                 source={require('../../fav_unselected.png')}
                 setFavoriteImage={true}/>   
        </TouchableOpacity>
      </View>
    )
  }

  handlerLoadMore = () =>{
    setPageCurrent(pageCurrent+1);
    setDeleteEnable(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={{color:'white', fontWeight:'bold', fontSize: 25}} onPress={() => navigation.navigate('Favorites')}>
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
      
      <FlatList
        style={{marginTop: 10, marginBottom:60}}
        keyExtractor={(item, index) => item.id }
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
