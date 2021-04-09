import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useCallback} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import {showLog} from '../../services/utils';
import {SIGN_IN_PROVIDER} from '../../constants';
import {resetAppStoreAction, resetAuthStoreAction} from '../../services/redux/actions';

const useSignOut = () => {
  const dispatch = useDispatch();
  const {signInProvider} = useSelector(
    state => ({
      signInProvider: state.App.signInProvider,
    }),
    shallowEqual,
  );

  const clear = useCallback(() => {
    dispatch(resetAppStoreAction());
    dispatch(resetAuthStoreAction());
  }, [dispatch]);

  const handleGoogleSignOut = useCallback(() => {
    try {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    } catch (e) {
      showLog(e);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    if (signInProvider === SIGN_IN_PROVIDER.DEFAULT) {
      auth().signOut();
    } else {
      if (signInProvider === SIGN_IN_PROVIDER.GOOGLE) {
        handleGoogleSignOut();
      }
    }
    clear();
  }, [signInProvider, handleGoogleSignOut, clear]);

  return {handleSignOut, signInProvider};
};

export default useSignOut;
