import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {setApp} from '../../services/redux/actions';

const useUser = () => {
  const dispatch = useDispatch();
  const {displayName, email} = useSelector(
    state => ({
      displayName: state.App.displayName,
      email: state.App.email,
    }),
    shallowEqual,
  );

  const setUser = useCallback(
    user => {
      dispatch(setApp({...user}));
    },
    [dispatch],
  );

  return {displayName, email, setUser};
};

export default useUser;
