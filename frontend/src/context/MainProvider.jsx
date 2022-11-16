import React, { useState, useMemo } from 'react';
import Context from './index.jsx';

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  });

  const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={memo}>
      {children}
    </Context.Provider>
  );
};

export default MainProvider;
