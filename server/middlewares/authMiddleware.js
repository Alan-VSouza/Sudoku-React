const jwt = require('jsonwebtoken'); // Importa módulo jsonwebtoken, utilizado para criar, assinar e verificar tokens 

const authMiddleware = (req, res, next) => { // função authMiddleware
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Acessa o cabeçalho Authorization e remove o prefixo 'Bearer', 
  // que é utilizado em tokens JWT para diferenciá-los de outros tipos de tokens, se não tiver presente não ocorrerá um erro devido ao '?'
  if (!token) { // Se nenhum token for encontrado ele retorna 401
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try { // Verifica e decodifica o token usando a chave secreta que está no env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
