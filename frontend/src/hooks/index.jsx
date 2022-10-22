import { useContext } from 'react';

import authContext from '../context/index.jsx';

const useAuth = () => useContext(authContext);

export default useAuth;