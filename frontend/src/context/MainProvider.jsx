import React, { useState, useMemo } from 'react';
import Context from './index.jsx';

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState(localStorage.getItem('user'));

  console.log(userData);

  const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={memo}>
      {children}
    </Context.Provider>
  );
};

export default MainProvider;