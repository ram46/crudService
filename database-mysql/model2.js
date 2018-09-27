const Sequelize = require('sequelize');
const db = require('./index.js')

module.exports = {
  sequelize: db.sequelize,
  getVersion: function(caseName, cb) {
    db.Case.find({where:{name: caseName}}).then((caseObj) => {
      caseObj.getVersions().then((versions) => {
       var versionNumber = versions.length + 100
        cb(versionNumber)
      })
    })

  },

  createNewIOC: function(caseName, IOC, iocType, cb) {

      db.Case.find({where:{name: caseName}}).then((caseObj) => {

      if (caseObj) {
        db.IOC.find({where: {ioc: IOC, type: iocType}}).then((ioc) => {
          if (ioc) cb("Error: ioc already exist in this case", null);
          if (!ioc) {
            db.IOC.create({ioc: IOC, type: iocType}).then((ioc) => {
              ioc.addCase(caseObj)
              module.exports.getVersion(caseName, (currentVersion) => {
                var newVersion = currentVersion + 1;
                db.Version.create({number: newVersion}).then((version) => {
                  version.addCase(caseObj);
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
              version.addCase(newCase);
              cb(null, "success");
            })
          })
        })
      }
    })
},


  updateIOC: function(fromValue, toValue, iocType) {
    db.IOC.update({ioc: toValue, type: iocType}, {where: {ioc: fromValue}}).then((ioc) => {
      console.log(ioc)
      if (!ioc[0]) throw new Error("value to update not found ....")
      else  {
        console.log("updated!! ")

      }
    })
  },


  deleteIOC: function() {

  },

  deleteCase: function() {},
  getIOCsOFCase: function() {},
  getVersionsOFCase: function() {},
  getVersionsOFIOC: function() {},
  getVersionsOFCase: function() {},
}


module.exports.createNewIOC("APT101", "33derder1.exe", "file", (err, result) => {
  console.log("result ****************", result);
  console.log("errr ****************", err);
})


