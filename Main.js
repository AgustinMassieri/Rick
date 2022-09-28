import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Image, Modal, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import AccordionItem from './AccordionItem.js';

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

  const apiURL = 'https://rickandmortyapi.com/api/character/?page=' + pageCurrent + '&name=' + nameFilter + '&status=' + statusFilter + '&gender=' + genderFilter + '&type=' + typeFilter + '&species=' + speciesFilter;

  useEffect(() => {
    getData();
    console.log();
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
      <>
        <TouchableOpacity onPress={() => {
          setCharacterCurrent(item);
          setShowModal(true);
        }}>
          <Text style={styles.texto}>{item.name}</Text>
          <Image style={styles.image} source={{uri: item.image}} />
        </TouchableOpacity>
      </>
    )
  }

  handlerLoadMore = () =>{
    setPageCurrent(pageCurrent+1);
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
                     />
      <TextInput style={styles.searchBar} value={nameFilter} onChangeText={ (value) => {setNameFilter(value); setPageCurrent(1);} } placeholder='Search for characters by name ...'></TextInput>            
      <FlatList
        style={{marginTop: 10, marginBottom:60}}
        keyExtractor={(item, index) => item.id }
        numColumns={2}
        columnWrapperStyle={styles.row}
        data={characters}
        renderItem={renderItem}
        onEndReached={handlerLoadMore}
      />

      <View style={{left:-50,flexDirection:'row',maxWidth:250}}>
        
        <Text style={styles.filteredBy}>Filtered by:</Text>
        {statusFilter && (
          <Text style={styles.filteredBy}>{statusFilter}</Text>
        )}
        {genderFilter && (
          <Text style={styles.filteredBy}>{genderFilter}</Text>
        )}
        {typeFilter && (
          <Text style={styles.filteredBy}>{typeFilter}</Text>
        )}
        {speciesFilter && (
          <Text style={styles.filteredBy}>{speciesFilter}</Text>
        )}
      </View>        

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle:{
    fontStyle: 'italic',
    color: 'white',
    marginBottom: 20
  },
  modalCard: {
    width: '70%',
    height: '43%',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#585858',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444444',
    color: 'whtie',
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
    width: 160,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: 20,
    marginLeft:25,
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  image2: {
    width: '80%',
    height: '60%', 
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    paddingHorizontal: 10,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    right: 35,
    bottom:65
  },
  filteredBy: {
    marginRight:10, 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 18
  },
  searchBar: {
    borderRadius:10,
    borderColor: 'black', 
    borderStyle:'solid',
    borderWidth: 2, 
    backgroundColor:'white', 
    width: 250, 
    height: 30, 
    paddingLeft: 10,
    marginTop: 10
  }
});