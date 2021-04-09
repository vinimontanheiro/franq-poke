import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {showLog} from '../../services/utils';
import useMessageTools from './useMessageTools';
import useLoading from './useLoading';
import usePokemon from './usePokemon';

const URI = `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`;

const usePokeApi = () => {
  const {t} = useTranslation(`pokemon`);
  const {showMessage} = useMessageTools(`error`);
  const [, setLoading] = useLoading();
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = usePokemon();

  const getPokemon = useCallback(
    async url => {
      try {
        const response = await fetch(url);
        const poke = await response.json();
        return poke;
      } catch (error) {
        setLoading(false);
        showMessage(`its_not_possible_to_get_a_pokemon`);
        showLog(error);
        return null;
      }
    },
    [setLoading, showMessage],
  );

  const listPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${URI}/pokemon`);
      const {results} = await response.json();
      const pokemonPromise = results.reduce(async (acc, {name, url}) => {
        const {
          abilities,
          types: [type],
          sprites: {front_default: avatar},
        } = await getPokemon(url);
        return [
          ...(await acc),
          ...[
            {
              name,
              url,
              abilities,
              ...type,
              avatar,
            },
          ],
        ];
      }, []);

      const pokemonList = await pokemonPromise;
      setPokemons(pokemonList);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      showMessage(`its_not_possible_to_get_pokemon_list`);
      setPokemons([]);
      showLog(error);
    }
  }, [setLoading, showMessage, getPokemon]);

  useEffect(() => {
    if (!!pokemons.length && !pokemon?.name) {
      const [first] = pokemons;
      setPokemon(first);
    }
  }, [pokemon, setPokemon, pokemons]);

  return {
    t,
    pokemons,
    listPokemons,
    getPokemon,
    pokemon,
    setPokemon,
  };
};

export default usePokeApi;
