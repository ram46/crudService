const utils = require('./utils.js')

module.exports = {

  create: function(query, cb) {
    // query = {"caseName": "APT22" , "ioc": "file.exe", "ioctype": "file" }
    ({caseName, ioc, ioctype} = JSON.parse(query))
    utils.createIOC(caseName, ioc, ioctype, (err, success) => {
      if (err) cb('error in creating ioc', null)
      if(success) {
        cb(null, 'create transaction succeeded')
        // utils.searchInLogs(caseName, (err, done) => {})
      }
    })

    utils.searchInLogs(caseName, (err, done) => {
      // if (err) cb('error in searching', null)
      // if (done) cb(null, 'done searching')
    })
  },


  read: function(query, cb) {
    // query = {"caseName": "APT22", versionNum: 100}
    // query = {"caseName": "APT22"}
    ({caseName, versionNum} = JSON.parse(query))
    versionNum = parseInt(versionNum) || 'latest'
    utils.readIOC(caseName, versionNum, (err, result) => {
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

    utils.searchInLogs(caseName, (err, done) => {
      if (err) cb('error in searching', null)
      if (done) cb(null, 'done searching')
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



// var q1 = JSON.stringify({"caseName": "APT22" , "ioc": "44.exe", "ioctype": "file" })
// var q2 = JSON.stringify({"caseName": "APT22" , "ioc": "111.exe", "ioctype": "file" })
// var q3 = JSON.stringify({"caseName": "APT22" , "ioc": "6.6.6.6", "ioctype": "ip" })
// var q4 = JSON.stringify({"caseName": "APT22", "versionNum": 100})
// var q5 = JSON.stringify({"caseName": "APT22", "fromValue": "6.6.6.6", "toValue": "66.c", "iocType": "file" })
// var q6 = JSON.stringify({"caseName": "APT22", "iocToDelete": "44.exe", "iocType":"file"})


// module.exports.create(q1, (err, result) => {
//   module.exports.create(q2, (err, result) => {
//     module.exports.create(q3, (err, result) => {
//       module.exports.read(q4, (err, result) => {
//         module.exports.create("APT100", "111.exe", "file", (err, result) => {
//           module.exports.create("APT100", "7.7.7.7", "IP", (err, result) => {
//             module.exports.update(q5, (err, result) => {
//               module.exports.delete(q6, (err, result) => {
//                 module.exports.delete("APT100", "5.5.5.5", "IP", (err, result) => {
//                 })
//               })
//             })
//           })
//         })
//       })
//     })
//   })
// })
