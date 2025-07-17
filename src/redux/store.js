// src/redux/store.js
import { createStore } from 'redux';
import hangmanReducer from './reducers';

const store = createStore(hangmanReducer);

export default store;
