import {useCallback, useContext} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import useMessageTools from './useMessageTools';
import {showLog} from '../../services/utils';
import {SCREEN, SIGN_IN_PROVIDER} from '../../constants';
import {AuthContext} from '../../services/context';
import useLoading from './useLoading';
import useSignOut from './useSignOut';
import useUser from './useUser';

const useSign = () => {
  const navigation = useNavigation();
  const {authSignIn} = useContext(AuthContext);
  const {t} = useTranslation(`sign`);
  const {firebaseCatchError, showMessage} = useMessageTools(`sign`);
  const {handleSignOut, handleGoogleLogout} = useSignOut();
  const [, setLoading] = useLoading();
  const {setUser} = useUser();

  const setToken = useCallback(
    async user => {
      try {
        const idToken = await user?.getIdToken();
        authSignIn(idToken);
      } catch (error) {
        showLog(error);
      }
    },
    [authSignIn],
  );

  const handleSignUp = useCallback(
    async ({name, email, password}) => {
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          email.toLowerCase().trim(),
          password,
        );
        user.updateProfile({displayName: name.trim()});
        user.sendEmailVerification();
        showMessage(`verification_email_sent`);
        navigation.navigate(SCREEN.SIGN_IN);
      } catch (error) {
        firebaseCatchError(error);
        showLog(error);
      }
    },
    [showMessage, firebaseCatchError, navigation],
  );

  const handleSignIn = useCallback(
    async ({email, password}) => {
      try {
        setLoading(true);
        const {user} = await auth().signInWithEmailAndPassword(
          email.toLowerCase().trim(),
          password,
        );
        if (user.emailVerified) {
          const {displayName, email: fbEmail} = user;
          setUser({displayName, email: fbEmail, signInProvider: SIGN_IN_PROVIDER.DEFAULT});
          setToken(user);
        } else {
          showMessage(`error:please_verify_your_account`);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        firebaseCatchError(error);
        showLog(error);
      }
    },
    [setToken, firebaseCatchError, setLoading, setUser, showMessage],
  );

  const handleGoToSignUp = useCallback(() => {
    navigation.navigate(SCREEN.SIGN_UP);
  }, [navigation]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const signInResult = await GoogleSignin.signIn();
      setLoading(true);
      const googleCredential = auth.GoogleAuthProvider.credential(signInResult.idToken);
      const {user} = await auth().signInWithCredential(googleCredential);
      const {displayName, email} = user;
      setUser({displayName, email, signInProvider: SIGN_IN_PROVIDER.GOOGLE});
      setToken(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleGoogleLogout();
      showMessage(`error:unauthorized_user`);
      showLog(error);
    }
  }, [setLoading, handleGoogleLogout, showMessage, setToken, setUser]);

  return {
    t,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    handleGoToSignUp,
    handleGoogleSignIn,
  };
};

export default useSign;
