import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  mesageBox: {
    width: `100%`,
    height: 20,
    maxHeight: 20,
    alignSelf: `flex-end`,
  },
  message: {
    width: `93%`,
    fontSize: 11,
    textAlign: `right`,
  },
  error: {
    color: theme.colors.danger,
  },
});

const InputErrorMessage = ({style = {}, error}) => {
  const {t} = useTranslation(`error`);
  return (
    !!error && (
      <View style={[styles.mesageBox, style]}>
        <Text style={[styles.message, styles.error]}>{t(error)}</Text>
      </View>
    )
  );
};

InputErrorMessage.defaultProps = {
  error: ``,
  style: {},
};

InputErrorMessage.propTypes = {
  style: PropTypes.shape({}),
  error: PropTypes.string,
};

export default InputErrorMessage;
