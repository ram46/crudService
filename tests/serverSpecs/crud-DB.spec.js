var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../../database-mysql/index.js')
var model = require('../../database-mysql/model2.js');


describe('Connection to DB', () => {
  it('Connects to db successfully', () => {
    db.sequelize.authenticate().then( () => {
      var msg = 'ok';
      expect(msg).to.equal('ok');
    })
    .catch( (err) => {
      console.error(err);
    })
  })
})

describe('Query DB', () => {
  it('Queries case that does not exist', () => {
    db.Case.find({where: {name: 'thisDoesNOTExistAndShouldNot'}}).then( (caseObj) => {
      expect(caseObj).to.equal(null)
    });
  });
});


var _getVersion = function(caseName, cb) {
  db.Case.find({where:{name: caseName}}).then((caseObj) => {
    caseObj.getVersions().then((versions) => {
      var versionNumber = versions.length - 1 + 100
        cb(versionNumber)
    });
  });
}

describe('Writing, Deleting, Modifying DB', () => {

  after(function(done) {
    try {
      db.sequelize.query("DELETE FROM cases");
      db.sequelize.query("DELETE FROM iocs");
      db.sequelize.query("DELETE FROM versions");
      db.sequelize.query("DELETE FROM caseIOCs");
      db.sequelize.query("DELETE FROM caseVersions");
      done();
    }
    catch(err) {
      console.log('error in after section of cleanup');
      done();
    }
  });

  it('should create case if does not exist', (done) => {
   model.createIOC('specAPT101', 'wiuewsds.exe', 'file', (error, result) => {
      expect(result).to.equal('success');

      db.Case.find({where: {"name":"specAPT101"}}).then( (caseObj) => {
        expect(caseObj.name).to.equal('specAPT101');
        done();
      });
    });
  });

  it('should have version 100 for newly created case', (done) => {
    _getVersion("specAPT101", (num) => {
        expect(num).to.equal(100);
        done();
      });
    });

  it('should have the added ioc wiuewsds.exe in case', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 100, (error, diff) => {
      db.IOC.find({where: {"ioc":"wiuewsds.exe"}}).then( (iocObj) => {
        expect(iocObj.ioc).to.equal('wiuewsds.exe');
        expect(diff).to.deep.equal(['wiuewsds.exe']);
        done();
      });
    });
  });

  it('should not have a wrong ioc in the case', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 100, (error, diff) => {
      expect(diff).to.not.deep.equal(['wrongFile.exe']);
      done();
    });
  });


  it('should be able to add more iocs in the same case', (done) => {
    model.createIOC('specAPT101', '7.7.7.7', 'IP', (error, result) => {
      expect(result).to.equal('ok');
      done();
    });
  });

  it('should now have version 101 for case specAPT101', (done) => {
    _getVersion("specAPT101", (num) => {
        expect(num).to.equal(101);
        done();
      });
    });

  it('should be able to create a new case with same ioc in existing case', (done) => {
   model.createIOC('specAPT102', 'wiuewsds.exe', 'file', (error, result) => {

      db.Case.find({where: {"name":"specAPT102"}}).then( (caseObj) => {
        expect(caseObj.name).to.equal('specAPT102');
        expect(result).to.equal('success');
        done();
      });
    });
  });


  it('should be able to delete ioc from a case', (done) => {
    model.deleteIOC('specAPT101', 'wiuewsds.exe', 'file', (err, result) => {
      expect(result).to.equal('ok');
      done();
    });
  });

  it('should have incremented the case version after deleting', (done) => {
      _getVersion('specAPT101', (result) => {
        expect(result).to.equal(102);
        done();
      });
    });

  it('should not have the deleted ioc in current state case', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 102, (error, diff) => {
      var iocExists = diff.includes('wiuewsds.exe');
      expect(iocExists).to.equal(false);
      done();
    });
  });

  it('should give error if asked to delete the same ioc again ', (done) => {
    model.deleteIOC('specAPT101', 'wiuewsds.exe', 'file', (err, result) => {
      expect(err).to.equal('ioc wiuewsds.exe already does not exist');
      done();
    });
  });

  it('should not have incremented the case version', (done) => {
    _getVersion('specAPT101', (result) => {
      expect(result).to.not.equal(103);
      expect(result).to.equal(102);
      done();
    });
  });

  it('should be able to modify the ioc', (done) => {
    model.updateIOC('specAPT101', '7.7.7.7', '5.5.5.5', 'IP', (err, result) => {
      db.IOC.find({where:{"ioc": "5.5.5.5"}}).then( (iocObj) => {
        expect(result).to.equal('ok');
        expect(iocObj.ioc).to.equal("5.5.5.5");
        done();
      });
    });
  });

  it('should have the version incremented by 1', (done) => {
    _getVersion('specAPT101', (result) => {
      expect(result).to.equal(103);
      done();
    });
  });


  it('should now have the new ioc in specAPT101 in version 103', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 103, (error, diff) => {
      var iocExists = diff.includes('5.5.5.5');
      expect(iocExists).to.equal(true);
      done();
    });
  });

  it('should not have the old ioc that was replaced', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 103, (error, diff) => {
      var iocExists = diff.includes('7.7.7.7');
      expect(iocExists).to.equal(false);
      done();
    });
  });

});
