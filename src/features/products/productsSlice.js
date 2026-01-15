import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            ...product,
          },
        };
      },
    },
    updateProduct(state, action) {
      const { id, changes } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...changes };
      }
    },
    deleteProduct(state, action) {
      const id = action.payload;
      state.products = state.products.filter((p) => p.id !== id);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
