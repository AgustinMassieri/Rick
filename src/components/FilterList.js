import React from 'react';
import {View, Text} from 'react-native';
import styles from '../screens/MainStyles.js';

const FiltersList = ({statusFilter, genderFilter, typeFilter, speciesFilter}) => {
    return(
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
    )
}

export default FiltersList;