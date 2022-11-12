import {createSlice} from '@reduxjs/toolkit';

export const charactersSlice = createSlice({
    name: 'characters',
    initialState: {
        list: []
    },
    reducers: {
        addCharactersToList: (state, action) => {
            state.list = state.list.concat(action.payload);
        },
        setCharactersList: (state, action) => {
            state.list = action.payload;
        }
     }
})

export const { addCharactersToList, setCharactersList } = charactersSlice.actions;

export default charactersSlice.reducer;

export function fetchCharacters(apiURL) {

    return async dispatch => {
        fetch(apiURL) 
        .then(response => response.json())
        .then(response => {
            dispatch(addCharactersToList(response.results));
        })
    }

}