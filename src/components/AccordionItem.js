import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Vibration } from 'react-native';
import status from '../../filterValues/statusValues.js'
import gender from '../../filterValues/genderValues.js'
import species from '../../filterValues/speciesValues.js'
import types from '../../filterValues/typesValues.js'
import { setCharactersList, resetCurrentPage, resetFilters, setGenderFilter, 
          setStatusFilter, setTypeFilter, setSpeciesFilter, setDeleteButtonEnable,
          setOpenAccordionFilters, setOpenAccordionStatusFilter, setOpenAccordionGenderFilter,
          setOpenAccordionTypeFilter, setOpenAccordionSpeciesFilter } from '../store/slices/characters/index.js';
import { useDispatch, useSelector } from 'react-redux';

const AccordionItem = () => {

  const dispatch = useDispatch();
  const { statusFilter, speciesFilter, typeFilter, genderFilter, deleteButtonEnable, openAccordionFilters, 
          openAccordionStatusFilter, openAccordionGenderFilter, openAccordionTypeFilter, openAccordionSpeciesFilter } = useSelector(state => state.characters);

  const updateDeleteButton = (filterValue, otherFilterValue1, otherFilterValue2, otherFilterValue3) =>{

    if(filterValue=='' && otherFilterValue1=='' && otherFilterValue2=='' && otherFilterValue3==''){
      dispatch(setDeleteButtonEnable(false));
    }else{
      dispatch(setDeleteButtonEnable(true));
    }

  }

  const optionsList = (data, setFilter, filterValue, otherFilterValue1, otherFilterValue2, otherFilterValue3) => {
    
    return data.map( (element) => { 
      return (
        <View key={element.key}>
          <TouchableOpacity onPress={() => {dispatch(setCharactersList([])); dispatch(resetCurrentPage()); 
            if( filterValue == '') {
              dispatch(setFilter(element.value)); 
              updateDeleteButton(element.value, otherFilterValue1, otherFilterValue2, otherFilterValue3);
            }else{
              dispatch(setFilter(''));
              updateDeleteButton('', otherFilterValue1, otherFilterValue2, otherFilterValue3);
              
            }}}>
            <Text style={styles.text}>{element.value}</Text>
          </TouchableOpacity>
        </View>
      )
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(setOpenAccordionFilters(!openAccordionFilters))}>
        <View style>
          <Text style={styles.filters_label} >Filters</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
          if(deleteButtonEnable){
            dispatch(resetFilters());
            dispatch(resetCurrentPage());
            dispatch(setCharactersList([]));
            dispatch(setDeleteButtonEnable(false));
            Vibration.vibrate(10*100000000);
          }
        }}>
        <Image style={styles.papelera} source={require('../../papelera.png')}/>     
      </TouchableOpacity> 
      
      {openAccordionFilters && (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => dispatch(setOpenAccordionStatusFilter(!openAccordionStatusFilter))}>
            <View>
              <Text  style={styles.filters_label}>Status</Text>
            </View>
          </TouchableOpacity>
          {openAccordionStatusFilter && (
            
            <TouchableOpacity activeOpacity={0.9} backgroundColor='white'>
             <View style={styles.options}>{optionsList(status, setStatusFilter,statusFilter,genderFilter, typeFilter, speciesFilter )}</View>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.button} onPress={() => dispatch(setOpenAccordionGenderFilter(!openAccordionFilters))}>
            <View>
              <Text  style={styles.filters_label}>Gender</Text>
            </View>
          </TouchableOpacity>
          {openAccordionGenderFilter && (
            <View style={styles.options}>{optionsList(gender, setGenderFilter, genderFilter, statusFilter, typeFilter, speciesFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => dispatch(setOpenAccordionTypeFilter(!openAccordionStatusFilter))}>
            <View>
              <Text style={styles.filters_label}>Type</Text>
            </View>
          </TouchableOpacity>
          {openAccordionTypeFilter&& (
            <View style={styles.options} >{optionsList(types, setTypeFilter, typeFilter,statusFilter,genderFilter,speciesFilter)}</View>
          )}

          <TouchableOpacity style={styles.button} onPress={() => dispatch(setOpenAccordionSpeciesFilter(!openAccordionSpeciesFilter))}>
            <View>
              <Text style={styles.filters_label}>Species</Text>
            </View>
          </TouchableOpacity>
          {openAccordionSpeciesFilter&& (
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
