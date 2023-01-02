import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import rootReducer from './root-reducer';


import presistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/es/storage";


const presistConfig = {
  key: "main-root-1",
  storage,
  timeout: null,
};


const presistedReducer = persistReducer(presistConfig, rootReducer);

const store = createStore(presistedReducer, applyMiddleware(thunk));
export default store;
export const presistor = presistStore(store);