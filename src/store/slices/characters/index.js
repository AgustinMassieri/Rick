import { createSlice } from '@reduxjs/toolkit';

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        list: [],
        showCharacterModal: false,
        currentPage: 1,
        nameFilter: '',
        statusFilter: '', 
        genderFilter: '',
        typeFilter: '',
        speciesFilter: '',
        currentCharacter: ''
    },
    reducers: {
        addCharactersToList: (state, action) => {
            state.list = state.list.concat(action.payload);
        },
        setCharactersList: (state, action) => {
            state.list = action.payload;
        },
        setShowCharacterModal: (state, action) => {
            state.showCharacterModal = action.payload;
        },
        incrementCurrentPage: (state) => {
            state.currentPage = state.currentPage + 1; 
        },
        resetCurrentPage: (state) => {
            state.currentPage = 1;
        },
        resetFilters: (state) => {
            state.nameFilter = '',
            state.genderFilter = '',
            state.statusFilter = '',
            state.typeFilter = '',
            state.speciesFilter = ''
        },
        setStatusFilter: (state, action) => {
            state.statusFilter = action.payload;
        },
        setGenderFilter: (state, action) => {
            state.genderFilter = action.payload;
        },
        setTypeFilter: (state, action) => {
            state.typeFilter = action.payload;
        },
        setSpeciesFilter: (state, action) => {
            state.speciesFilter = action.payload;
        },
        setNameFilter: (state, action) => {
            state.nameFilter = action.payload;
        },
        setCurrentCharacter: (state, action) => {
            state.currentCharacter = action.payload;
        }
     }
})

export const { addCharactersToList, setCharactersList, setShowCharacterModal, incrementCurrentPage, resetCurrentPage,
                resetFilters, setStatusFilter, setGenderFilter, setTypeFilter, setSpeciesFilter, setNameFilter, setCurrentCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;

export function fetchCharacters(currentPage, nameFilter, statusFilter, genderFilter, typeFilter, speciesFilter) {

    return async dispatch => {
        fetch('https://rickandmortyapi.com/api/character/?page=' + currentPage + '&name=' + nameFilter + '&status=' + statusFilter + '&gender=' + genderFilter + '&type=' + typeFilter + '&species=' + speciesFilter) 
        .then(response => response.json())
        .then(response => {
            dispatch(addCharactersToList(response.results));
        })
    }

}