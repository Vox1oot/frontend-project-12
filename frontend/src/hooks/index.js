import { useContext } from 'react';

import Context, { SocketContext } from '../context/index.js';

const useAuthContext = () => useContext(Context);
export const useSocketContext = () => useContext(SocketContext);

export default useAuthContext;
