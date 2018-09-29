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
    })
  })
})


describe('Writing to DB', () => {

  after(function(done) {
    db.sequelize.query("DELETE FROM cases");
    db.sequelize.query("DELETE FROM iocs");
    db.sequelize.query("DELETE FROM versions");
    db.sequelize.query("DELETE FROM caseIOCs");
    db.sequelize.query("DELETE FROM caseVersions");
    done();
  });

  it('should create case if does not exist', (done) => {
   model.createNewIOC('specAPT101', 'wiuewsds.exe', 'file', (error, result) => {
      expect(result).to.equal('success');
      done();
    });
  })


  it('should create case with the ioc wiuewsds.exe', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 100, (error, diff) => {
      expect(diff).to.deep.equal(['wiuewsds.exe']);
      done();
    });
  })


  it('should not have a wrong ioc in the case', (done) => {
    model.getCaseVersionSnapshot('specAPT101', 100, (error, diff) => {
      expect(diff).to.not.deep.equal(['wrongFile.exe']);
      done();
    });
  })
})




