import nativeI18n from 'react-native-i18n';
import i18next from 'i18next';
import moment from 'moment-timezone';
import {initReactI18next} from 'react-i18next';
import 'moment/locale/pt-br';
import pt from './locales/pt.json';
import {DEFAULT_TIMEZONE} from '../../constants';

moment.tz.setDefault(DEFAULT_TIMEZONE);
const xx = pt;
const currentLocale = nativeI18n.currentLocale();
const convertedLocale = currentLocale.startsWith(`es`) ? `es` : currentLocale.replace(`-`, `_`);

i18next.use(initReactI18next).init({
  lng: convertedLocale,
  fallbackLng: `xx`,
  resources: {
    pt_BR: pt,
    xx,
  },
});
moment.locale(convertedLocale);

export default i18next;
