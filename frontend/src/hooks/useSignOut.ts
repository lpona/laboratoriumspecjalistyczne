import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCurrentUser } from '../rtk/currentUserSlice';
import { AppDispatch } from '../rtk/store';

const useSignOut = () => {
  const dispatch = useDispatch<AppDispatch>();

  const history = useHistory();

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    history.push('/login');
    dispatch(clearCurrentUser());
  }, [dispatch, history]);

  return signOut;
};

export default useSignOut;
