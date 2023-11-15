require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const FavoriteModel = require('../src/models/Favorite')
const UserModel = require('../src/models/User')
const user_favoriteModel = require('../src/models/user_favorite')

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
   { logging:false, native: false }
);

sequelize
   .authenticate()
   .then(() => console.log('Connection has been established successfully.'))
   .catch((error) => console.log(error))

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
FavoriteModel(sequelize)
UserModel(sequelize)
user_favoriteModel(sequelize)
//
//

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite, user_favorite} = sequelize.models;

User.belongsToMany(Favorite, { through: user_favorite ,foreignKey: "userId"});
Favorite.belongsToMany(User, { through: user_favorite ,foreignKey: "favoriteId"});

module.exports = {
   User,
   Favorite,
   user_favorite,
   conn: sequelize,
};
