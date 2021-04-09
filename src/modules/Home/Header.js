import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import React, {useContext} from 'react';
import {StatusBar, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import theme from '../../assets/theme';
import {AuthContext} from '../../services/context';
import useUser from '../hooks/useUser';

const Header = () => {
  const {top} = useSafeAreaInsets();
  const {authSignOut} = useContext(AuthContext);
  const {displayName} = useUser();
  const {t} = useTranslation(`header`);

  return (
    <>
      <StatusBar animated backgroundColor={theme.colors.white} barStyle="dark-content" />
      <View style={[styles.header, {marginTop: top}]}>
        <Text style={styles.title}>{`${t(`hello`)} ${displayName}`}</Text>
        <TouchableOpacity onPress={authSignOut}>
          <Icon name="logout" color={theme.colors.purple} size={26} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: `row`,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.white,
    alignItems: `center`,
    height: 55,
    justifyContent: `space-between`,
  },
  title: {
    fontSize: 17,
    fontWeight: `bold`,
    color: theme.colors.dark,
  },
});

export default Header;
