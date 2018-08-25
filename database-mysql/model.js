const IOC = require('./index.js').IOC

module.exports = {
  create: function(iocs) {

  },

  read: function(filter, cb) {
    //IOC.findAll({where: {}}).then( (result) => {

    filter = filter || {}

    console.log(filter)
    IOC.findAll({where: filter}).then( (result) => {
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  },


  update: function(iocs) {

  },

  delete: function(iocs) {

  }
}
