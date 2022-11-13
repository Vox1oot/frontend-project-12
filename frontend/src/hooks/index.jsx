import { useContext } from 'react';

import Context from '../context/index.jsx';

const useAuthContext = () => useContext(Context);

export default useAuthContext;
