import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TouchableHighlight, Vibration} from 'react-native';
import status from '../../filterValues/statusValues.js'
import gender from '../../filterValues/genderValues.js'
import species from '../../filterValues/speciesValues.js'
import types from '../../filterValues/typesValues.js'

const AccordionItem = ({setPageCurrent, setStatusFilter, setGenderFilter, setTypeFilter, setSpeciesFilter, setCharacters, setNameFilter, deleteEnable, setDeleteEnable}) => {
  const [showContent, setShowContent] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSpecies, setShowSpecies] = useState(false); 

  const optionsList = (data, setFilter) => {
    
    return data.map( (element) => { 
      return (
        <View key={element.key}>
          <TouchableOpacity onPress={() => {setCharacters([]); setFilter(element.value); setPageCurrent(1); setDeleteEnable(true);}}>
            <Text style={styles.text}>{element.value}</Text>
          </TouchableOpacity>
        </View>
      )
    });
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.button} onPress={() => setShowContent(!showContent)}>
        <View>
          <Text style={{fontWeight: 'bold'}} >Filters</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          if(deleteEnable){
            setStatusFilter("");
            setGenderFilter("");
            setTypeFilter("");
            setSpeciesFilter("");
            setNameFilter("");
            setPageCurrent(1);
            setCharacters([]);
            Vibration.vibrate(10*100000000);
            setDeleteEnable(false);
          }
        }}>
        <Image style={styles.papelera} source={require('../../papelera.png')}/>     
      </TouchableOpacity> 
      
      {showContent && (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => setShowStatus(!showStatus)}>
            <View>
              <Text  style={{fontWeight: 'bold'}}>Status</Text>
            </View>
          </TouchableOpacity>
          {showStatus && (
            
            <TouchableHighlight activeOpacity={0.9} backgroundColor='white'>
              <View style={styles.options}>{optionsList(status, setStatusFilter)}</View>
            </TouchableHighlight>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowGender(!showGender)}>
            <View>
              <Text  style={{fontWeight: 'bold'}}>Gender</Text>
            </View>
          </TouchableOpacity>
          {showGender && (
            <View style={styles.options}>{optionsList(gender, setGenderFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowType(!showType)}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Type</Text>
            </View>
          </TouchableOpacity>
          {showType&& (
            <View style={styles.options} >{optionsList(types, setTypeFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowSpecies(!showSpecies)}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Species</Text>
            </View>
          </TouchableOpacity>
          {showSpecies&& (
              <View style={styles.options}>{optionsList(species, setSpeciesFilter)}</View>
          )}

        </View>
      )}

    </View>
  );
};

export default AccordionItem;

const styles = StyleSheet.create({

  
  button: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    height: 30,
    width: 150,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    width: 140,
    color: 'white',
    fontSize: 15,
    paddingVertical:5,
    //backgroundColor: 'blue',
    paddingHorizontal: 10,
    textAlign: 'center',

  },
  options: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  papelera: {
    resizeMode: 'contain', 
    height:30, 
    position: 'absolute', 
    top: -35,
    left: 120,
    width:30
  },
  container:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'black',
    color: 'white',
    marginTop: 30
  }
});