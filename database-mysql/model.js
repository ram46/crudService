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
    //IOC.findAll({where: {}}).then( (result) => {

    filter = filter || {}

    console.log(filter)
    IOC.findAll({where: filter}).then( (result) => {
      cb(null, result);
    }).catch( (err) => {
      cb(err, null);
    })
  },


  update: function(query, cb) {
    // var query = {"newValue": {"ioc": "3.3.2.2"}, "where":  {"where": {"ioc" : "2.2.2.2"} }}

    IOC.update(query.newValue, query.where).then((result) => {
      // cb(null, result)
    }).spread((affectedCount, affectedRows) => {
        return IOC.findAll();
    }).then(iocs => {
      cb(null, iocs)
      console.log(iocs, affectedCount)
    }).catch((err) => {
      cb(err, null);
    })


  },

  delete: function(iocs) {

  }
}


// var query = {"newValue": {"ioc": "3.2.3.2"}, "where":  {"where": {"ioc" : "4.4.4.4"} }}
// module.exports.update(query, () => {})



