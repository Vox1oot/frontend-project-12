import { createContext, useContext } from 'react';

const Context = createContext({});
export const SocketContext = createContext(null);
export const useAuthContext = () => useContext(Context);
export const useSocketContext = () => useContext(SocketContext);
export default Context;
