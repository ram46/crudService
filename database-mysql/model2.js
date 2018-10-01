const Sequelize = require('sequelize');
const db = require('./index.js')



var _getVersion = function(caseName, cb) {

  db.Case.find({where:{name: caseName}}).then((caseObj) => {
    caseObj.getVersions().then((versions) => {
      var versionNumber = versions.length - 1 + 100
        cb(versionNumber)
    })
  })
}

var _iocExistsInCurrentCaseState = function(caseName, IOC, cb) {
  // get the last version of the case
  _getVersion(caseName, (currentVersion) => {
    // recontruct and check if the last version has this ioc, if not, then create, else not.
    module.exports.getCaseVersionSnapshot(caseName, currentVersion, (err, currentState) => {
      cb(currentState.includes(IOC));
    });
  });
}


var _getCaseIdAndVersionIdsByCasename = function(caseName, versionNumber, cb) {
    db.Case.find({where: {name: caseName}}).then((caseObj) => {
      if (!caseObj)  cb(`case ${caseName} not found`, null)

      if (caseObj) {

        var caseID = caseObj.id
        var versionIds = []
        var caseVersionMap = {}

        caseObj.getVersions().then((versions) => {
          // versions.length should never be zero, because as soon as case created it has a version 100

          // creating an array of versionNumbers just to check if the required versionNumber exists and provide proper error
          versionNumbers = versions.map((elem) => {
            return elem.number
          })

          if (versionNumbers.indexOf(versionNumber) === -1 ) cb(`version ${versionNumber} not found in case ${caseName} `, null)

          else if (versionNumbers.indexOf(versionNumber) !== -1 ) {
            versionIDs = versions.map((elem) => {
            return elem.id
              })
            caseVersionMap = {caseName: caseName, caseId: caseID, versionId: versionIDs }
            cb(null, caseVersionMap)
           }
        })
      }
    })
  }


  var __unpackCreatedIOC = function(arr, objValue) {
      arr.push(objValue)

  }

  var __unpackDeletedIOC = function(arr, objValue) {
    var indexToDelete = arr.indexOf(objValue)
    if (indexToDelete === -1) return "elem to delete not found"
    else arr.splice(indexToDelete, 1)
  }

  var  __unpackModifiedIOC = function(arr, objValue) {
    var fromValue = objValue.from;
    var toValue = objValue.to;

    var indexToModify = arr.indexOf(fromValue);
    if (indexToModify === -1) return "elem to delete not found"
    else arr.splice(indexToModify, 1, toValue)
  }

  // sample diff = [ '{"createdIOC":"33derder1.exe", "createdCase":"APT100"}', '{"createdIOC":"7.7.7.7"}', '{"modifiedIOC":{"from":"7.7.7.7", "to":"5.5.5.5"}}' ]

  var _processDiffs = function(diffs) {
    var output = []
    diffs.forEach((DBtransaction) => {
      for (var [key, value] of Object.entries(JSON.parse(DBtransaction))) {
        if (key === 'createdIOC') {
          __unpackCreatedIOC(output, value)
        }

        if (key === 'modifiedIOC') {
          __unpackModifiedIOC(output, value)
        }

        if (key === 'deletedIOC') {
          __unpackDeletedIOC(output, value)
        }
      }
    })
    return output
  }


module.exports = {

createIOC: function(caseName, IOC, iocType, cb) {

      db.Case.find({where:{name: caseName}}).then((caseObj) => {

      if (caseObj) {

        _iocExistsInCurrentCaseState(caseName, IOC, (iocExists) => {

          if (iocExists) {
            cb(`ioc ${IOC} already exists in case ${caseName} `, null);
          } else {
            db.IOC.create({ioc: IOC, type: iocType}).then((ioc) => {
            ioc.addCase(caseObj)
            _getVersion(caseName, (currentVersion) => {
              var newVersion = currentVersion + 1;
              db.Version.create({number: newVersion}).then((version) => {
                version.addCase(caseObj, {through: {diff: `{"createdIOC":"${IOC}"}`}});
                  cb(null, "ok");
                })
              })
            })
          }
        })

      }

      if (!caseObj) {
        db.Case.create({name: caseName}).then((newCase) => {
          db.IOC.find({where: {ioc: IOC, type: iocType}}).then((ioc) => {
            if (ioc) {
              // if ioc exist then dont create it
              ioc.addCase(newCase)
            } else if (!ioc) {
              // if ioc does not exist then create it
              db.IOC.create({ioc: IOC, type: iocType}).then((ioc) => {
                ioc.addCase(newCase)

              })
            }

            db.Version.create({number:100}).then((version) => {
              version.addCase(newCase, {through: {diff: `{"createdIOC":"${IOC}", "createdCase":"${caseName}"}`}})
              cb(null, "success");
            })
          })
        })
      }
    })
},


 updateIOC: function(caseName, fromValue, toValue, iocType, cb) {
    db.Case.find({where:{name: caseName}}).then((caseObj) => {
    if (!caseObj) {
      cb(`case ${caseName} does not exist`, null);
    }

    if (caseObj) {
       _iocExistsInCurrentCaseState(caseName, fromValue, (iocExists) => {
          if (!iocExists) cb('no ioc found tomodify', null);
          if (iocExists) {
            db.IOC.create({ioc: toValue, type: iocType}).then((ioc) => {
              ioc.addCase(caseObj);
              _getVersion(caseName, (currentVersion) => {
                var newVersion = currentVersion + 1;
                db.Version.create({number: newVersion}).then((version) => {
                  version.addCase(caseObj, {through: {diff:`{"modifiedIOC":{"from":"${fromValue}", "to":"${toValue}"}}`}});
                  cb(null, "ok");

                })
              })
            })
          }
      })
    }
  })
},

  deleteIOC: function(caseName, iocToDelete, iocType, cb) {
    db.Case.find({where:{name: caseName}}).then((caseObj) => {
      if (!caseObj) {
        cb(`case ${caseName} does not exist`, null);
      }
      if (caseObj) {
        // it is possible that someone re-created the ioc after deleting. If so, it should be able to delete again and so on.
        _iocExistsInCurrentCaseState(caseName, iocToDelete, (iocExists) => {
          if (!iocExists) cb(`ioc ${iocToDelete} already does not exist`, null);
          if (iocExists) {
            _getVersion(caseName, (currentVersion) => {
            var newVersion = currentVersion + 1;
            db.Version.create({number: newVersion}).then((version) => {
              version.addCase(caseObj, {through: {diff: `{"deletedIOC":"${iocToDelete}"}`}});
                cb(null, "ok");
              })
            })
          }
        })
      }
    })
  },

  readIOC: function(caseName, versionNumber, cb) {
    if (versionNumber !== 'latest') {
      versionToRead = versionNumber;
      module.exports.getCaseVersionSnapshot(caseName, versionNumber, (err, iocs) => {
        if (err) cb(err, null)
        if (iocs) cb(null, iocs)
      });
    }

    if (versionNumber === 'latest') {
      _getVersion( caseName, (currentVersion) => {
        module.exports.getCaseVersionSnapshot(caseName, currentVersion, (err, iocs) => {
          if (err) cb(err, null)
          if (iocs) cb(null, iocs)
        });
      })
    }
  },

  getCaseVersionSnapshot: function(caseName, versionNumber, cb) {
    var diffs = []
    var versionCount = versionNumber - 100 // 100 is starting point for every version number
    _getCaseIdAndVersionIdsByCasename(caseName, versionNumber, (err, caseVersionMap) => {
      if (err) cb(err, null)
      if (caseVersionMap) {
        var caseID = caseVersionMap.caseId
        var versionIDs = caseVersionMap.versionId.slice(0, versionCount + 1)
        db.CaseVersion.findAll({where:{caseId: caseID,  versionId:versionIDs}}).then((caseVersionObj) => {
          caseVersionObj.forEach((elem) => diffs.push(elem.diff))
          output = _processDiffs(diffs)
          cb(null, output)
        })
      }
    })
  },
}

// module.exports.readIOC("APT100",'latest', (err, iocs) => {
//   console.log(iocs)
//   console.log(err)
// })

// module.exports.getCaseVersionSnapshot("APT100", 109, (err, diff) => {
//   console.log("err ****************", err);
//   console.log("diff ****************", diff);
// })


module.exports.createIOC("APT120", "44.exe", "file", (err, result) => {
  module.exports.createIOC("APT100", "a.exe", "file", (err, result) => {
    module.exports.createIOC("APT100", "7.7.7.7", "IP", (err, result) => {

      module.exports.createIOC("APT100", "111.exe", "file", (err, result) => {
        module.exports.createIOC("APT100", "7.7.7.7", "IP", (err, result) => {

          module.exports.updateIOC("APT100", "7.7.7.7", "5.5.5.5", "IP", (err, result) => {
            module.exports.deleteIOC("33derder1.exe", "file", "APT100", (err, result) => {

              module.exports.deleteIOC("APT100", "5.5.5.5", "IP", (err, result) => {

              })
            })
          })
        })
      })
    })
  })
})
