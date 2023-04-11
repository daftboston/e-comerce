import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


import { useDispatch } from 'react-redux';

export const productSlice = createSlice({
    name: 'product',
    initialState:[],
    reducers: {
        setProduct : (state,action)=> {
            return action.payload
        }
    }
})




export const getProductsThunk = () => dispatch => {
    dispatch (setIsLoading(true))
    axios
    .get ("https://e-commerce-api-v2.academlo.tech/api/v1/products")
    .then(resp => {dispatch(setProduct(resp.data))
                    console.log(resp.data)})
    .catch (error => console.error(error)) 
   .finally(()=>dispatch(setIsLoading(false)))

}

export const filterCategoriesThunk = id => dispatch => {
    axios
       .get (`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
       . then (resp => dispatch(setProduct(resp.data)) )
       .catch (error => console.error(error))
}


//Busqueda de producto
export const filterProductThunk= valueInput => dispatch=> {
     dispatch (setIsLoading(true))
     axios.get (`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${valueInput}`)
     .then (resp => dispatch(setProduct(resp.data)))
     .catch (error=> console.error(error))
     .finally(()=>dispatch(setIsLoading(false)))
     
}

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
