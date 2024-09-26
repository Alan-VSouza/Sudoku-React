import React, { createContext, useState } from 'react';
// Import do createContext e useState da biblioteca react

export const AuthContext = createContext(); // Cria um contexto para permitir passar dados para tudo sem utilizar de props manual

export const AuthProvider = ({ children  }) => { // Atua como provedor de contexto, envolvendo os outros elementos
  // Children são os props que representam os filhos passados para o componente

  const [authState, setAuthState] = useState({ // authState contém o token JWT e um booleano que indica se o usuário está autenticado
    // setAuthState atualiza o estado de autentificação

    token: localStorage.getItem('token') || '',
    isAuthenticated: Boolean(localStorage.getItem('token')),
  });

  const login = (token) => { // Realiza o login através do token recebido
    localStorage.setItem('token', token); // Armazena o token
    setAuthState({ token, isAuthenticated: true });
  };

  const logout = () => { // Realiza o logout
    localStorage.removeItem('token'); // Remove do localstorage o token
    setAuthState({ token: '', isAuthenticated: false }); // Atualiza como não autenticado
  };

  return ( // Envolve os componentes filhos e fornece o estado deles
    <AuthContext.Provider value={{ authState, login, logout }}> 
      {children}
    </AuthContext.Provider>
  );
};
