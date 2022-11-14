import {configureStore} from '@reduxjs/toolkit';
import characters from './slices/characters';
import users from './slices/users';

export default configureStore({

    reducer: {
        characters,
        users
    }
})