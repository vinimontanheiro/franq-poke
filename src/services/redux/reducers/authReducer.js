import {handleActions} from 'redux-actions';
import {RESET_AUTH_STORE, RESTORE_TOKEN, SIGN_IN} from '../actions';

const initialState = {
  token: null,
  isSignOut: true,
};

const Auth = handleActions(
  {
    [RESET_AUTH_STORE]: () => initialState,
    [RESTORE_TOKEN]: (state, {payload}) => ({
      ...state,
      token: payload,
    }),
    [SIGN_IN]: (state, {payload}) => ({
      ...state,
      token: payload,
      isSignOut: false,
    }),
  },
  initialState,
);

export default Auth;
