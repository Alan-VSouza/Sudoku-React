const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { getSequelize } = require('../config/mysql');

// Importações necessárias

let User; // Variável User que será utilizada para armazenar o modelo do usuário

function initializeUserModel() { // Define a função initializeUserModel que inicializa e configura o modelo de usuário.
  const sequelize = getSequelize(); // Chama a função getSequelize para obter a instância configurada do Sequelize.

  User = sequelize.define('User', { // Define o user com os campos username e a password
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.prototype.matchPassword = async function (password) { // Esse metodo recebe uma senha e a compara com a senha hasheada armazenada no banco de dados usando bcrypt.compare
    return await bcrypt.compare(password, this.password);
  };

  return User;
}

module.exports = {
  initializeUserModel,
  getUserModel: () => User,
};
