import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {WEB_CLIENT} from '../../constants';

const useBootstrap = () => {
  useEffect(() => {
    auth().languageCode = `pt`;
    GoogleSignin.configure({
      webClientId: WEB_CLIENT,
    });
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
};

export default useBootstrap;
