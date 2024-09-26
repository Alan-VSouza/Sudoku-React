import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => { // Página a ser exibida quando a home for carregada
  return (
    <div className="container">
      <h1>Welcome to Sudoku Game</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/sudoku">Jogar Sudoku</Link>
      </nav>
    </div>
  );
};

export default Home;
