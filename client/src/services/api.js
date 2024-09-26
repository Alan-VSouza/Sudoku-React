import axios from 'axios';
// Importação da biblioteca Axios

const api = axios.create({ // Cria uma instância personalizada do axios
  baseURL: 'http://localhost:5000/api' // Define a url para o axios
});

export default api;
