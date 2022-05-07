import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useState } from 'react';
import { auth } from '../libs/firebase';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [save, setSave] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  
  onAuthStateChanged(auth, (user) => {
    setLoggedUser(user);
  });
  const value = { save, setSave, loggedUser, setLoggedUser };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};

export { AuthContext, AuthProvider };

