import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import './Login.css';

// Importações necessárias para o Login

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' }); // formData guarda os dados do formulário
  const [errorMessage, setErrorMessage] = useState(''); // errorMessage guarda as mensagens de erro
  const { login } = useContext(AuthContext); // Função do contexto AuthContext
  const history = useHistory(); // Utilizado para poder navegar programaticamente

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza formData quando o usuário digitar os campos
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); // Previne que a página seja recarregada como padrão de formulário
    try { // Tenta fazer a requisição para o api/auth/login
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token);
      history.push('/sudoku'); // Se tudo for certo ele redireciona para a pagina sudoku
    } catch (error) { // se algum error for encontrado ele é mostrado no console e a mensagem é setada: Usuário ou senha inválidos
      console.error(error);
      setErrorMessage('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
      <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
    </div>
  );
};

export default Login;
