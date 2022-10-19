import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Image, Modal, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import gender from '../../filterValues/genderValues.js';
import AccordionItem from '../components/AccordionItem.js';
import FiltersList from '../components/FilterList.js';
import FlatListItem from '../components/FlatListItem.js';
import styles from './MainStyles.js';

const Main = () => {

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

  renderItem = ({item}) => {
    return(
      <FlatListItem item={item} 
                    setCharacterCurrent={setCharacterCurrent} 
                    setShowModal={setShowModal}/>
    )
  }

  handlerLoadMore = () =>{
    setPageCurrent(pageCurrent+1);
    setDeleteEnable(true);
  }

  return (
    <SafeAreaView style={styles.container}>

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
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
          <Text style={{top: 5, marginLeft:210, fontSize: 30, color: 'white'}} onPress={() => setShowModal(false)}>X</Text>
          <Text style={{marginBottom:10, fontSize: 25, color: 'white', fontWeight: 'bold', textShadowColor: 'black', textShadowRadius: 5,}}>{characterCurrent.name}</Text>
          <Image style={styles.image2} source={{uri: characterCurrent.image}}></Image>
          <Text style={styles.button}>{characterCurrent.status}</Text>
          <Text style={{fontSize: 18, color: 'white'}}>Species: <Text style={{fontWeight: 'bold'}}>{characterCurrent.species}</Text></Text>          
          {characterCurrent.type && (
            <Text style={{fontSize: 18, color: 'white'}}>Type: <Text style={{fontWeight: 'bold'}}>{characterCurrent.type}</Text></Text>
          )}
          <Text style={{fontSize: 18, color: 'white'}}>Gender: <Text style={{fontWeight: 'bold'}}>{characterCurrent.gender}</Text></Text>
          </View>
        </View>
      </Modal>   
    </SafeAreaView>
  )

} 

export default Main;
