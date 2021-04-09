import {useCallback} from 'react';
import {ToastAndroid, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {IS_ANDROID} from '../../constants';
import {parseMessageToTag} from '../../services/utils';

const MESSAGE_TIMEOUT = 8000;

const useMessageTools = (messageKey = `error`) => {
  const {t} = useTranslation(messageKey);

  const showMessage = useCallback(
    message => {
      if (IS_ANDROID) {
        ToastAndroid.showWithGravity(
          t(message),
          MESSAGE_TIMEOUT,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        Alert.alert(t(message), null, [
          {
            text: t(`action:close`),
            style: `cancel`,
          },
        ]);
      }
    },
    [t],
  );

  const firebaseCatchError = useCallback(
    (error, enableMessage = true, errorCallback) => {
      if (error && error.code) {
        const tag = `error:${parseMessageToTag(error.code)}`;
        if (typeof errorCallback === `function`) {
          errorCallback(tag);
        }
        if (enableMessage) {
          showMessage(t(tag));
        }
        console.warn(tag);
        return tag;
      }
      return `error:unknown_error`;
    },
    [t, showMessage],
  );

  return {showMessage, firebaseCatchError};
};

export default useMessageTools;
