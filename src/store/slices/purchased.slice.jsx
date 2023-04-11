import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';

export const purchasedSlice = createSlice({
    name: 'purchased',
    initialState: [],
    reducers: {
        setPurchased: (state, action)=>{
            return action.payload 
        }

    }
})


export const { setPurchased } = purchasedSlice.actions;

export default purchasedSlice.reducer;
