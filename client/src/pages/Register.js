import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './Register.css';

// Importações necessárias para o Register

const Register = () => { // Define um componente funcional com o nome de Register
  const [formData, setFormData] = useState({ username: '', password: '' }); // O formData armazena os dados do formulário (nome de usuário e senha)
  const [errorMessage, setErrorMessage] = useState(''); // errorMessage Armazena a mensagem de erro
  const history = useHistory(); // Navegação programática entre rotas

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza formData quando o usuário digitar os campos
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne que a página seja recarregada como padrão de formulário
    try { 
      await axios.post('http://localhost:5000/api/auth/register', formData); // Efetua uma requisição do tipo post para a url /api/auth/register
      history.push('/login'); // Redireciona o usuário para a página de login após o register ser um sucesso
    } catch (error) {
      console.error(error); // Caso ocorra um erro é mostrado no console
      setErrorMessage('Erro ao registrar. Tente novamente.'); // Mensagem é setada para demonstrar o erro
    }
  };

  return (
    <div className="container">
      <h1>Registrar</h1>
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
        <button type="submit">Registrar</button>
      </form>
      <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
};

export default Register;
