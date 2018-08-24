
const Sequelize = require('sequelize');
const sequelize = require('./index.js').sequelize;

const IOC = sequelize.define('ioc', {
  ioc: Sequelize.STRING,
  type: Sequelize.STRING,
  analyst:  Sequelize.STRING,
  notes: Sequelize.TEXT,
  case: {type: Sequelize.STRING, unique: true, allowNull: true},
  version: {type: Sequelize.INTEGER},
});


IOC.sync();


IOC.bulkCreate([
  { ioc: '2.2.2.2',
    type: 'IP',
    analyst: 'john',
    notes: 'testing 123',
    case: 'ABC',
    version: 1
  },

  { ioc: 'mal',
    type: 'string',
    analyst: 'james',
    notes: 'test',
    case: 'XYZ',
    version: 1
  },


  { ioc: 'mango.com',
    type: 'domain',
    analyst: 'john',
    notes: 'testing 123',
    case: 'DD',
    version: 1
  },


  { ioc: '9.0.0.1',
    type: 'IP',
    analyst: 'maya',
    notes: 'slsds',
    case: 'codeB',
    version: 1
  },


  { ioc: 'cartoonnetwork.com',
    type: 'domain',
    analyst: 'nabeela',
    notes: 'testing 123',
    case: 'glucose',
    version: 1
  },


  { ioc: '1.2.2.2',
    type: 'IP',
    analyst: 'john',
    notes: 'testing 123',
    case: 'sea',
    version: 1
  },


  { ioc: 'pdf',
    type: 'IP',
    analyst: 'mkr',
    notes: '123',
    case: 'random',
    version: 1
  }],

)
.then(function(user) {
    console.log('success');
})
.catch(function(err) {
    console.log('Oh!!!', err);
});

// IOC.drop()


