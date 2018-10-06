// const IOC = require('./index.js').IOC
const utils = require('./utils.js')



module.exports = {

  create: function(caseName, IOC, iocType, cb) {
    utils.createIOC(caseName, IOC, iocType, (err, success) => {
      if (err) cb('error in creating IOC', null)
      if(success) {
        cb(null, 'create transaction succeeded')
      }
    })


    utils.searchInLogs(caseName, (err, done) => {
      if (err) cb('error in searching', null)
      if (done) cb(null, 'done searching')
    })
  },


  read: function(caseName, versionNumber, cb) {
    utils.readIOC(caseName, versionNumber, (err, result) => {
      if (err) cb('error in reading', null)
      if (result) cb(null, result)
    })
  },


  update: function(caseName, fromValue, toValue, iocType, cb) {
  // var old_query = {"newValue": {"ioc": "3.3.2.2"}, "where":  {"where": {"ioc" : "2.2.2.2"} }}
    // new_query = {"caseName": "", "fromTo": {"", ""} }
    utils.updateIOC(caseName, fromValue, toValue, iocType, (err, success) => {
      if (err) cb('error in updating', null)
      if (success) cb(null , 'update transaction succeeded')
    })
  },

  delete: function(caseName, iocToDelete, iocType, cb) {
    utils.deleteIOC(caseName, iocToDelete, iocType, (err, success) => {
      if (err) cb('error in deleting', null)
      if (success) cb(null, 'delete transaction succeeded')

    })
  }
}




module.exports.create("APT120", "44.exe", "file", (err, result) => {
    // module.exports.getDiffOfLastTwoVersions('APT120', (err, res) => {
    //   console.log('apt120 case')
    //   console.log('err is ', err);
    //   console.log('res is ', res);

  module.exports.create("APT100", "111.exe", "file", (err, result) => {
  //   module.exports.createIOC("APT100", "7.7.7.7", "IP", (err, result) => {

  //     module.exports.createIOC("APT100", "111.exe", "file", (err, result) => {
  //       module.exports.createIOC("APT100", "7.7.7.7", "IP", (err, result) => {

  //         module.exports.updateIOC("APT100", "7.7.7.7", "5.5.5.5", "IP", (err, result) => {
  //           module.exports.deleteIOC("33derder1.exe", "file", "APT100", (err, result) => {

  //             module.exports.deleteIOC("APT100", "5.5.5.5", "IP", (err, result) => {

  //             })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
  })
})


// module.exports.create("APT120", "44.exe", "file", (err, result) => {
//   console.log("inside 1")
//   console.log("errrrr is ^^^^^^^^^ ", err)
//   console.log("result is ++++++++++ ", result)

  // module.exports.create("APT100", "111.exe", "file", (err, result) => {
  //   console.log("inside 2")
  //   console.log("errrrr is ^^^^^^^^^ ", err)
  //   console.log("result is ++++++++++ ", result)
  //   module.exports.create("APT100", "7.7.7.7", "IP", (err, result) => {
  //     console.log("inside 3")
  //     console.log("errrrr is ^^^^^^^^^ ", err)
  //     console.log("result is ++++++++++ ", result)

  //     module.exports.create("APT100", "111.exe", "file", (err, result) => {
  //       console.log("inside 4")
  //       console.log("errrrr is ^^^^^^^^^ ", err)
  //       console.log("result is ++++++++++ ", result)
  //       module.exports.create("APT100", "7.7.7.7", "IP", (err, result) => {
  //         console.log("inside 5")
  //         console.log("errrrr is ^^^^^^^^^ ", err)
  //         console.log("result is ++++++++++ ", result)

  //         module.exports.update("APT100", "7.7.7.7", "5.5.5.5", "IP", (err, result) => {
  //           console.log("inside 6")
  //           console.log("errrrr is ^^^^^^^^^ ", err)
  //           console.log("result is ++++++++++ ", result)
  //           module.exports.delete("33derder1.exe", "file", "APT100", (err, result) => {
  //             console.log("inside 7")
  //             console.log("errrrr is ^^^^^^^^^ ", err)
  //             console.log("result is ++++++++++ ", result)

  //             module.exports.delete("APT100", "5.5.5.5", "IP", (err, result) => {
  //               console.log("inside 8")
  //               console.log("errrrr is ^^^^^^^^^ ", err)
  //               console.log("result is ++++++++++ ", result)

  //             })
  //           })
  //         })
  //       })
  //     })
  //   })
  // })
// })




// module.exports = {
//   create: function(iocs, cb) {
//     IOC.bulkCreate(iocs).then( (result) => {
//       cb(null, result);
//     }).catch( (err) => {
//       cb(err, null);
//     })
//   },

//   read: function(filter, cb) {
//     //IOC.findAll({where: {}}).then( (result) => {

//     filter = filter || {}

//     console.log(filter)
//     IOC.findAll({where: filter}).then( (result) => {
//       cb(null, result);
//     }).catch( (err) => {
//       cb(err, null);
//     })
//   },


//   update: function(newValue, filter, cb) {
//     // var query = {"newValue": {"ioc": "3.3.2.2"}, "where":  {"where": {"ioc" : "2.2.2.2"} }}


//     IOC.update(newValue, {where:filter})
//     .then(iocs => {
//       cb(null, iocs)
//     }).catch((err) => {
//       cb(err, null);
//     })


//     // IOC.update(query.newValue, query.where).then((result) => {
//     //   // cb(null, result)
//     // }).spread((affectedCount, affectedRows) => {
//     //     return IOC.findAll();
//     // }).then(iocs => {
//     //   cb(null, iocs)
//     //   console.log(iocs, affectedCount)
//     // }).catch((err) => {
//     //   cb(err, null);
//     // })


//   },

//   delete: function(filter, cb) {
//     IOC.destroy({where: filter}).then( (result) => {
//       cb(null, result);
//     }).catch( (err) => {
//       cb(err, null);
//     })
//   }

// }


