import {combineReducers} from 'redux';
import {counterReducer} from './counter-reducer';
import {loadState, saveState} from '../utils/localstorage-utils';
import {legacy_createStore as createStore} from 'redux'

const rootReducer = combineReducers({
    counter: counterReducer
})

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState({
        counter: store.getState().counter
    });
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store