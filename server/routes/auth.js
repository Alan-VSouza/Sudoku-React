const express = require('express');
const { getUserModel } = require('../models/User');
const jwt = require('jsonwebtoken');

// Importações necessárias

const router = express.Router(); // Cria uma instância do roteador do Express para definir rotas de maneira modular

router.post('/register', async (req, res) => { // Define a rota post no register
  const { username, password } = req.body; // Pega o username e password do corpo da requisição
  console.log('Received registration request:', { username, password });
  if (!username || !password) { // Verifica se existem
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const User = getUserModel();
    const user = await User.create({ username, password });
    console.log('User created successfully:', user);
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Error during user registration:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Username already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => { // Define a rota post de login
  const { username, password } = req.body; // Pega o username e password do corpo da requisição
  console.log('Received login request:', { username, password });
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const User = getUserModel();
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.matchPassword(password))) {
      console.log('Invalid credentials for username:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Se tudo for um sucesso gera um token com o id do usuário e deixa a validade como 1 hora
    console.log('User logged in successfully:', user);
    res.json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
