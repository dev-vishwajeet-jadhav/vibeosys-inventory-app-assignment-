import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';

const PERSIST_KEY = 'inventory-app-state';

const loadState = () => {
  try {
    const serializedState = window.localStorage.getItem(PERSIST_KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      products: state.products,
    });
    window.localStorage.setItem(PERSIST_KEY, serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

export default store;
