import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import theme from '../../assets/theme';
import EmptyList from '../ui/EmptyList';
import PokemonItem from './PokemonItem';
import usePokeApi from '../hooks/usePokeApi';

const PokemonList = () => {
  const {t, listPokemons, pokemons, loading, setPokemon} = usePokeApi();

  useEffect(() => {
    listPokemons();
  }, [listPokemons]);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={true}
        legacyImplementation={false}
        style={styles.flatlist}
        scrollEnabled
        contentContainerStyle={[styles.listContainer, !pokemons.length && styles.emptyList]}
        data={pokemons}
        renderItem={({item}) => <PokemonItem pokemon={item} setPokemon={setPokemon} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={listPokemons} />}
        keyExtractor={item => `${item.name}`}
        ListEmptyComponent={<EmptyList message={t(`pokemon_not_found`)} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
  },
  flatlist: {
    flex: 1,
    width: `100%`,
    height: `90%`,
    backgroundColor: theme.colors.white,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  emptyList: {
    flex: 1,
    justifyContent: `center`,
    alignItems: `center`,
    height: `100%`,
  },
});

export default PokemonList;
