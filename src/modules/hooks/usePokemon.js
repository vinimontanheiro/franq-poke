import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {setApp} from '../../services/redux/actions';

const usePokemon = () => {
  const dispatch = useDispatch();
  const {pokemon} = useSelector(
    state => ({
      pokemon: state.App.pokemon,
    }),
    shallowEqual,
  );

  const setPokemon = useCallback(
    poke => {
      dispatch(setApp({pokemon: poke}));
    },
    [dispatch],
  );

  return [pokemon, setPokemon];
};

export default usePokemon;
