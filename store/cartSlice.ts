import { createSlice } from "@reduxjs/toolkit";


// product - price , name , quantity , image, category

export interface  CartItem {
     id: number,
     name : string,
     quantity: number,
     image: string
     category: string,
     price: number

}


interface CartState {
    items: CartItem[]
}


const initialState : CartState={
    items : []
}


const cartSlice = createSlice({
    name : 'cart',
    initialState,

    reducers:{
       addToCart: (state , action)=>{
          console.log('Product Added')
       }
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer

