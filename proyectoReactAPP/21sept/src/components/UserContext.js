import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    codigo_vendedor: null,
    id_admin: null,
    id_rol: null,
    nombre_usuario: '',
    nombre_empresa: '',
    email: '',
    pin: '',
    password: '',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};