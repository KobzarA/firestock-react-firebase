import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import FirebaseAuth from '../handlers/auth';

const { signIn, signOut, getCurrentUser } = FirebaseAuth;
const Context = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback(() => signIn().then(setCurrentUser), []);
  const logout = useCallback(() => signOut().then(null), []);
  const authenticate = useCallback(() => {
    getCurrentUser().then(setCurrentUser);
  }, []);
  const value = useMemo(() => {
    return {
      login,
      logout,
      currentUser,
      authenticate,
    };
  }, [login, logout, currentUser, authenticate]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  return useContext(Context);
};

export default AuthProvider;
