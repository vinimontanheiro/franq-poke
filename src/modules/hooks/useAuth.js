import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useEffect, useMemo} from 'react';
import {showLog} from '../../services/utils';
import {restoreTokenAction, signInAction} from '../../services/redux/actions';
import useSignOut from './useSignOut';

const useAuth = () => {
  const dispatch = useDispatch();
  const {handleSignOut} = useSignOut();

  const {token, isSignOut} = useSelector(
    state => ({
      token: state.Auth.token,
      isSignOut: state.Auth.isSignOut,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const restoreTokenAsync = async () => {
      try {
        auth().onAuthStateChanged(async user => {
          if (user) {
            const idToken = await user?.getIdToken();
            dispatch(restoreTokenAction(idToken));
          } else {
            handleSignOut();
          }
        });
      } catch (e) {
        showLog(e);
        handleSignOut();
      }
    };
    if (!isSignOut) {
      restoreTokenAsync();
    }
  }, [dispatch, isSignOut, handleSignOut]);

  const authContext = useMemo(
    () => ({
      authSignIn: async idToken => {
        dispatch(signInAction({token: idToken}));
      },
      authSignOut: async () => {
        handleSignOut();
      },
    }),
    [dispatch, handleSignOut],
  );

  return [authContext, {token, isSignOut}];
};

export default useAuth;
