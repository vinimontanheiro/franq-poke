import {createAction} from 'redux-actions';

export const RESET_APP_STORE = `RESET_APP_STORE`;
export const resetAppStoreAction = createAction(RESET_APP_STORE);

export const SET_APP = `SET_APP`;
export const setApp = createAction(SET_APP);

export const RESET_AUTH_STORE = `RESET_AUTH_STORE`;
export const resetAuthStoreAction = createAction(RESET_AUTH_STORE);

export const SIGN_IN = `SIGN_IN`;
export const signInAction = createAction(SIGN_IN);

export const RESTORE_TOKEN = `RESTORE_TOKEN`;
export const restoreTokenAction = createAction(RESTORE_TOKEN);
