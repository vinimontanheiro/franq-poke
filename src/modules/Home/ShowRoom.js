import React, {useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image, Platform, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import Header from './Header';
import theme from '../../assets/theme';
import PokemonList from './PokemonList';
import usePokemon from '../hooks/usePokemon';

const ShowRoom = ({navigation}) => {
  const [pokemon] = usePokemon();
  const {t} = useTranslation(`pokemon`);
  const {
    name,
    avatar,
    type: {name: typeName},
    abilities,
  } = pokemon;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.showRoom}>
        {!!pokemon?.avatar && <Image style={styles.avatar} source={{uri: avatar}} />}
        {!!pokemon && (
          <View style={styles.infoBox}>
            <View style={styles.info}>
              <Text style={styles.infoName}>{name}</Text>
              <Text style={styles.infoLabel}>{t(`name`)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoName}>{typeName}</Text>
              <Text style={styles.infoLabel}>{t(`type`)}</Text>
            </View>
            {abilities.map(({ability: {name: abilityName}}, index) => (
              <View key={`${name}-${abilityName}`} style={styles.info}>
                <Text style={styles.infoName}>{abilityName}</Text>
                <Text style={styles.infoLabel}>{`${t(`ability`)} ${index + 1}`}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <PokemonList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingTop: 20,
  },
  showRoom: {
    flex: 0.7,
    width: `85%`,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: theme.colors.grayLight,
    borderRadius: 15,
    ...Platform.select({
      android: {
        elevation: 1.8,
      },
      ios: {
        shadowOffset: {
          height: 3,
        },
        shadowRadius: 3,
        shadowOpacity: 1,
        backgroundColor: theme.colors.white,
      },
    }),
  },
  infoBox: {
    width: `100%`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    paddingHorizontal: 20,
    flexWrap: `wrap`,
  },
  info: {
    justifyContent: `center`,
    alignItems: `center`,
    padding: 3,
  },
  infoName: {
    fontSize: 14,
    textTransform: `capitalize`,
    color: theme.colors.purple,
  },
  infoLabel: {
    fontSize: 10,
    textTransform: `uppercase`,
    color: theme.colors.grayDark,
  },
  avatar: {
    width: 200,
    height: 200,
  },
});

ShowRoom.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
};

export default ShowRoom;
