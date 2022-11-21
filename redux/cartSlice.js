import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    total: 0,
    quanity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.total += action.payload.price * action.payload.quantity
      state.quanity += 1
    },
    reset: state => {
      state.products = []
      state.quanity = 0
      state.total = 0
    },
  },
})

export const { addProduct, reset } = cartSlice.actions
export default cartSlice.reducer
