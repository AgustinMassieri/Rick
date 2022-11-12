import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Vibration} from 'react-native';
import status from '../../filterValues/statusValues.js'
import gender from '../../filterValues/genderValues.js'
import species from '../../filterValues/speciesValues.js'
import types from '../../filterValues/typesValues.js'
import { setCharactersList } from '../store/slices/characters/index.js';
import { useDispatch } from 'react-redux';

const AccordionItem = ({setPageCurrent, setStatusFilter, 
  setGenderFilter, setTypeFilter, setSpeciesFilter,
  setNameFilter, deleteEnable, setDeleteEnable,
  statusFilter, genderFilter, typeFilter, speciesFilter}) => {

  const dispatch = useDispatch();

  const [showContent, setShowContent] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showSpecies, setShowSpecies] = useState(false); 

  const updateDeleteButton = (filterValue, otherFilterValue1, otherFilterValue2, otherFilterValue3) =>{

    if(filterValue=='' && otherFilterValue1=='' && otherFilterValue2=='' && otherFilterValue3==''){
      setDeleteEnable(false);
    }else{
      setDeleteEnable(true);
    }

  }

  const optionsList = (data, setFilter, filterValue, otherFilterValue1, otherFilterValue2, otherFilterValue3) => {
    
    return data.map( (element) => { 
      return (
        <View key={element.key}>
          <TouchableOpacity onPress={() => {dispatch(setCharactersList([])); setPageCurrent(1); 
            if( filterValue == '') {
              setFilter(element.value); 
              updateDeleteButton(element.value, otherFilterValue1, otherFilterValue2, otherFilterValue3, setDeleteEnable);
            }else{
              setFilter('');
              updateDeleteButton('', otherFilterValue1, otherFilterValue2, otherFilterValue3, setDeleteEnable);
              
            }}}>
            <Text style={styles.text}>{element.value}</Text>
          </TouchableOpacity>
        </View>
      )
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setShowContent(!showContent)}>
        <View style>
          <Text style={styles.filters_label} >Filters</Text>
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
            dispatch(setCharactersList([]));
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
              <Text  style={styles.filters_label}>Status</Text>
            </View>
          </TouchableOpacity>
          {showStatus && (
            
            <TouchableOpacity activeOpacity={0.9} backgroundColor='white'>
             <View style={styles.options}>{optionsList(status, setStatusFilter,statusFilter,genderFilter, typeFilter, speciesFilter )}</View>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowGender(!showGender)}>
            <View>
              <Text  style={styles.filters_label}>Gender</Text>
            </View>
          </TouchableOpacity>
          {showGender && (
            <View style={styles.options}>{optionsList(gender, setGenderFilter, genderFilter, statusFilter, typeFilter, speciesFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowType(!showType)}>
            <View>
              <Text style={styles.filters_label}>Type</Text>
            </View>
          </TouchableOpacity>
          {showType&& (
            <View style={styles.options} >{optionsList(types, setTypeFilter, typeFilter,statusFilter,genderFilter,speciesFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => setShowSpecies(!showSpecies)}>
            <View>
              <Text style={styles.filters_label}>Species</Text>
            </View>
          </TouchableOpacity>
          {showSpecies&& (
              <View style={styles.options}>{optionsList(species, setSpeciesFilter, speciesFilter, statusFilter, genderFilter,typeFilter)}</View>
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
    borderColor: '#C0C0C0',
    borderWidth: 1.2
  },
  text: {
    width: 140,
    color: 'white',
    fontSize: 15,
    paddingVertical:5,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  options: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  overlay: {
    backgroundColor: 'green'
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
    color: 'white',
    marginTop: '4%'
  },
  filters_label: {
    fontWeight: 'bold'
  }
});
