import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loaderSelector, toDefault } from '../../../redux/slices/loaderSlice.js';
import SpinnerComponent from './SpinnerComponent.jsx';
import { useAuthContext } from '../../../context/index.js';
import fetchAuthorizationData from '../../../redux/thunk.js';
import Chat from '../Chat';

const Checker = () => {
  const navigate = useNavigate();
  const loaderState = useSelector(loaderSelector);
  const { data } = useAuthContext();
  const useAuth = useAuthContext();
  const dispatch = useDispatch();

  const disconnect = useCallback(() => {
    localStorage.clear();
    useAuth.setUserData(null);
    dispatch(toDefault());
    navigate('/login');
  }, [useAuth, dispatch, navigate]);

  useEffect(() => {
    const { token } = data;
    dispatch(fetchAuthorizationData(token));
    if (loaderState === 'ERROR') {
      disconnect();
    }
  }, [loaderState, data, dispatch, disconnect]);

  return (
    <>
      {loaderState === 'AWAIT' && <SpinnerComponent />}
      <Chat />
    </>
  );
};

export default Checker;
