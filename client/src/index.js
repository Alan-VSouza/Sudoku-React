import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importações necessárias

ReactDOM.render( // Renderizar elemento DOM no react
  // StrictMode: Ferramenta para destacar problemas potenciais na aplicação
  // AuthProvider: Torna o estado de autenticação e métodos acessíveis a todos componentes
  // BrowserRouter: Envolve a aplicação para poder fornecer funcionalidades de roteamento,
  // permitindo navegar sem recarregar as páginas, utilizando histórico do navegador
  <React.StrictMode> 
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
