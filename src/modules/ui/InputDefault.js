import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet} from 'react-native';
import InputErrorMessage from './InputErrorMessage';
import theme from '../../assets/theme';
import {showLog} from '../../services/utils';

const styles = StyleSheet.create({
  group: {
    flexDirection: `column`,
    width: `100%`,
    height: 70,
    justifyContent: `center`,
    alignItems: `center`,
    marginTop: 10,
  },
  input: {
    width: `90%`,
    height: 50,
    fontSize: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    marginBottom: 2,
    borderRadius: 4,
    color: theme.colors.dark,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray,
  },
});

const InputDefault = ({groupStyle, label, errors, errorColor, ...rest}) => {
  return (
    <View style={[styles.group, groupStyle]}>
      <TextInput style={styles.input} {...rest} />
      <InputErrorMessage error={errors[label]} color={errorColor} />
    </View>
  );
};

InputDefault.defaultProps = {
  groupStyle: {},
  placeholder: ``,
  label: {},
  values: {},
  errors: {},
  handleChange: () => showLog,
  editable: true,
  errorColor: theme.colors.danger,
};

InputDefault.propTypes = {
  label: PropTypes.string,
  groupStyle: PropTypes.shape({}),
  placeholder: PropTypes.string,
  values: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  handleChange: PropTypes.func,
  editable: PropTypes.bool,
  errorColor: PropTypes.string,
};

export default InputDefault;
