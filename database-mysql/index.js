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


// try {
//   var sequelize = new Sequelize('ioc', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });
// }

// catch(e) {
//   console.log(e)
// }

const IOC = sequelize.define('ioc', {
  ioc: { type: Sequelize.STRING},
  type: Sequelize.STRING,
});

const Case = sequelize.define('case', {
  name: { type: Sequelize.STRING, unique: true }

});


const Version = sequelize.define('version', {
 number: { type: Sequelize.INTEGER}
});


const CaseIOC = sequelize.define('caseIOC', {
  id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true}
})


const CaseVersion = sequelize.define('caseVersion', {
  diff: {type: Sequelize.JSON},
  id: {type: Sequelize.INTEGER, primaryKey:true, autoIncrement:true}
})



IOC.belongsToMany(Case, {through: CaseIOC});
Case.belongsToMany(IOC, {through: CaseIOC});

Case.belongsToMany(Version, {through: CaseVersion});
Version.belongsToMany(Case, {through: CaseVersion});


sequelize.sync()


module.exports = {
  sequelize: sequelize,
  IOC: IOC,
  Version: Version,
  Case: Case,
  CaseIOC: CaseIOC,
  CaseVersion: CaseVersion
}













