import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View, StyleSheet, Text, Image, Platform} from 'react-native';
import theme from '../../assets/theme';

const PokemonItem = ({pokemon, setPokemon}) => {
  const {
    name,
    avatar,
    type: {name: typeName},
  } = pokemon;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setPokemon(pokemon);
        }}
        style={styles.item}>
        <Text style={styles.type}>{typeName}</Text>
        {!!avatar && <Image style={styles.avatar} source={{uri: avatar}} />}
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

PokemonItem.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    type: PropTypes.shape({name: PropTypes.string}).isRequired,
  }).isRequired,
  setPokemon: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: `100%`,
    paddingHorizontal: 10,
    height: 120,
    zIndex: 999,
    justifyContent: `center`,
    alignItems: `center`,
  },
  item: {
    width: 150,
    height: 120,
    flexDirection: `column`,
    padding: 15,
    borderRadius: 20,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: theme.colors.grayLight,
    ...Platform.select({
      android: {
        elevation: 2,
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
  type: {
    fontSize: 11,
    textTransform: `uppercase`,
    alignSelf: `flex-end`,
    color: theme.colors.purple,
  },
  avatar: {
    width: 85,
    height: 85,
  },
  name: {
    fontSize: 13,
    textTransform: `capitalize`,
    color: theme.colors.dark,
  },
});

export default PokemonItem;
