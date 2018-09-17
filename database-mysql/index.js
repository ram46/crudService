const Sequelize = require('sequelize');


try {
  var config = require('../config.js')
}


catch(e) {
  var config = {
    HOST     : 'cruddb-node',
    USER    : process.env.MYSQL_USER,
    PASSWORD : process.env.MYSQL_ROOT_PASSWORD,
    DATABASE : process.env.MYSQL_DATABASE,
    PORT: 3306
  }
}


try {
  var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'mysql',
  });
} catch(e) {
  console.log(e)
}


const IOC = sequelize.define('ioc', {
  ioc: Sequelize.STRING,
  type: Sequelize.STRING,
  analyst:  Sequelize.STRING,
  notes: Sequelize.TEXT,
  case: {type: Sequelize.STRING, allowNull: true},
  version: {type: Sequelize.INTEGER},
});

IOC.sync();

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });



module.exports.sequelize = sequelize;
module.exports.IOC = IOC;