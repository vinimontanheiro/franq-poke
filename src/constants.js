import {Platform} from 'react-native';

export const IS_DEVELOPMENT = process.env.NODE_ENV !== `production`;

export const IS_ANDROID = Platform.OS === `android`;

export const DEFAULT_TIMEZONE = `America/Sao_Paulo`;

export const SIGN_IN_PROVIDER = {
  DEFAULT: `default`,
  GOOGLE: `google`,
};

export const SCREEN = {
  SIGN_IN: `sign_in`,
  SIGN_UP: `sign_up`,
  SHOW_ROOM: `show_room`,
};

export const WEB_CLIENT = `1025003450350-fdrj32ui339a6ahm1nnh1q3797en02ee.apps.googleusercontent.com`;

export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
