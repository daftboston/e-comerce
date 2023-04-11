import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading.slice'
import product from './slices/product.slice'
import purchased from './slices/purchased.slice'
import cart from './slices/cart.slice'

export default configureStore({
    reducer: {
        isLoading,
        product, 
        purchased,
        cart,

    }
})
