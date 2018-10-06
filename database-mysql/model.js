// const IOC = require('./index.js').IOC
const utils = require('./utils.js')



module.exports = {

  create: function(query, cb) {
    // query = {"caseName": "APT22" , "ioc": "file.exe", "ioctype": "file" }
    ({caseName, ioc, ioctype} = JSON.parse(query))
    utils.createIOC(caseName, ioc, ioctype, (err, success) => {
      if (err) cb('error in creating ioc', null)
      if(success) {
        cb(null, 'create transaction succeeded')
      }
    })
    utils.searchInLogs(caseName, (err, done) => {
      if (err) cb('error in searching', null)
      if (done) cb(null, 'done searching')
    })
  },


  read: function(query, cb) {
    // var query = {"caseName": "APT22", versionNum: 100}
    // var query = {"caseName": "APT22"}
    ({caseName, versionNumber} = JSON.parse(query))
    versionNumber = parseInt(versionNumber) || 'latest'
    utils.readIOC(caseName, versionNumber, (err, result) => {
      if (err) cb('error in reading', null)
      if (result) cb(null, result)
    })
  },


  update: function(query, cb) {
    // query = {"caseName": "APT100", "fromValue": "8.8.8.8" :  toValue: "8.c" iocType: "file" }
    ({caseName, fromValue, toValue, iocType} = JSON.parse(query))
    utils.updateIOC(caseName, fromValue, toValue, iocType, (err, success) => {
      if (err) cb('error in updating', null)
      if (success) cb(null , 'update transaction succeeded')
    })
  },

  delete: function(query, cb) {
    // query = {"caseName": "APT100", iocToDelete": "8.c"  "iocType":"file"}
    ({caseName, iocToDelete, iocType} = JSON.parse(query))
    utils.deleteIOC(caseName, iocToDelete, iocType, (err, success) => {
      if (err) cb('error in deleting', null)
      if (success) cb(null, 'delete transaction succeeded')

    })
  },

  getAllCases: function(cb) {
    utils.getAllCases((err, cases) => {
      if (err) cb(err, null)
      else cb(null, cases)
    })
  },


  getCaseVersions: function(caseName, cb) {
    utils.getCaseVersions(caseName, (err, caseVersions) => {
      if (err) cb(err, null)
      else cb(null, caseVersions)
    })
  }
}



var q1 = JSON.stringify({"caseName": "APT22" , "ioc": "44.exe", "ioctype": "file" })
var q2 = JSON.stringify({"caseName": "APT22" , "ioc": "111.exe", "ioctype": "file" })
var q3 = JSON.stringify({"caseName": "APT22" , "ioc": "6.6.6.6", "ioctype": "ip" })
var q4 = JSON.stringify({"caseName": "APT22", "versionNumber": 100})
var q5 = JSON.stringify({"caseName": "APT22", "fromValue": "6.6.6.6", "toValue": "66.c", "iocType": "file" })
var q6 = JSON.stringify({"caseName": "APT22", "iocToDelete": "44.exe", "iocType":"file"})


// module.exports.create(q1, (err, result) => {
//     module.exports.getDiffOfLastTwoVersions('APT120', (err, res) => {
//       console.log('apt120 case')
//       console.log('err is ', err);
//       console.log('res is ', res);

// module.exports.create(q1, (err, result) => {
//   module.exports.create(q2, (err, result) => {
//     module.exports.create(q3, (err, result) => {
//       module.exports.read(q4, (err, result) => {
//       // module.exports.create("APT100", "111.exe", "file", (err, result) => {
//       //   module.exports.create("APT100", "7.7.7.7", "IP", (err, result) => {

//           module.exports.update(q5, (err, result) => {
//             module.exports.delete(q6, (err, result) => {

//               // module.exports.delete("APT100", "5.5.5.5", "IP", (err, result) => {

//               })
//             })
//           // })
//       //   })
//       })
//     })
//   })
// })
// })


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


