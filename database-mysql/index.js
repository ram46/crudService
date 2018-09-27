const Sequelize = require('sequelize');


// try {
//   var config = require('../config.js')
// }


// catch(e) {
//   var config = {
//     HOST    : process.env.CLEARDB_DATABASE_HOST,
//     USER    : process.env.CLEARDB_DATABASE_USER,
//     PASSWORD  : process.env.CLEARDB_DATABASE_PASSWD,
//     DATABASE : process.env.CLEARDB_DATABASE,
//     CLIENT_ID: process.env.CLIENT_ID,
//     PORT: 3306
//   }
// }


// try {
//   var sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
//     host: 'cruddb-node',
//     dialect: 'mysql',
//   });
// } catch(e) {
//   console.log(e)
// }



// ########### For Dev Work Only ###############
var sequelize = new Sequelize('brown', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});



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













