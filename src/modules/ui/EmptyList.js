import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const EmptyList = ({message}) => (
  <View style={styles.container}>
    <Text>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    height: `100%`,
  },
});

EmptyList.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyList;
