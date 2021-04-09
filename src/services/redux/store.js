import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {name as appName} from '../../../app.json';
import Reducers from './reducers';

const rootReducer = combineReducers({
  ...Reducers,
});
const persistConfig = {
  key: appName,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [`navigation`],
};
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
