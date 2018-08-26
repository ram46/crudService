const IOC = require('./index.js').IOC

module.exports = {
  create: function(iocs, cb) {
    IOC.bulkCreate(iocs).then( (result) => {
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  },

  read: function(filter, cb) {
    filter = filter || {}
    IOC.findAll({where: filter}).then( (result) => {
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  },


  update: function(iocNew, iocOld, cb) {
    IOC.update(iocNew, {where:iocOld}).then((result) => {
      console.log('sdsdsdsdsdsdsds', result)
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  },

  delete: function(filter, cb) {
    IOC.destroy({where: filter}).then( (result) => {
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  }
}
