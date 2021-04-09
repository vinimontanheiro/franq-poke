import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {setApp} from '../../services/redux/actions';

const useLoading = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(
    state => ({
      loading: state.App.loading,
    }),
    shallowEqual,
  );

  const setLoading = useCallback(
    l => {
      dispatch(setApp({loading: l}));
    },
    [dispatch],
  );

  return [loading, setLoading];
};

export default useLoading;
