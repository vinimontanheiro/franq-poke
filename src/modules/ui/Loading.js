import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import useLoading from '../hooks/useLoading';
import theme from '../../assets/theme';

const Loading = ({overlayerColor, size}) => {
  const [loading] = useLoading();

  return (
    loading && (
      <View style={[styles.overlayer, {backgroundColor: overlayerColor}]}>
        <View style={styles.container}>
          <ActivityIndicator color={theme.colors.dark} size={size} />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  overlayer: {
    position: `absolute`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
  container: {
    display: `flex`,
    width: `100%`,
    height: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  loader: {
    display: `flex`,
  },
});

Loading.defaultProps = {
  overlayerColor: theme.colors.loadingOverlayer,
  size: `large`,
};

Loading.propTypes = {
  overlayerColor: PropTypes.string,
  size: PropTypes.string,
};

export default Loading;
