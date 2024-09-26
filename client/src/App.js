import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sudoku from './pages/Sudoku';
import './App.css';

function App() { 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'F5') {
        event.preventDefault();
        alert("Atalho 'F5' desabilitado");
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ( // Componente app, com switch que define as rotas
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/sudoku" component={Sudoku} />
      </Switch>
    </div>
  );
}

export default App;
