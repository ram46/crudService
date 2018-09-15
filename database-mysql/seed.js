const IOC = require('./index.js').IOC


IOC.sync();


IOC.bulkCreate([
  { ioc: 'kavkazcentr.info',
    type: 'domain',
    analyst: 'john',
    notes: 'DnsEntryItem',
    case: 'APT28',
    version: 1
  },

  { ioc: 'rnil.am',
    type: 'domain',
    analyst: 'james',
    notes: 'DnsEntryItem',
    case: 'APT28',
    version: 1
  },


  { ioc: 'n0vinite.com',
    type: 'domain',
    analyst: 'john',
    notes: 'DnsEntryItem',
    case: 'APT28',
    version: 1
  },


  { ioc: 'poczta.mon.q0v.pl',
    type: 'domain',
    analyst: 'maya',
    notes: 'DnsEntryItem',
    case: 'APT28',
    version: 1
  },


  { ioc: 'Microsoft\MediaPlayer\{E6696105-E63E-4EF1-939E-15DDD83B669A}',
    type: 'domain',
    analyst: 'nabeela',
    notes: 'RegistryItem',
    case: 'APT28',
    version: 1
  },


  { ioc: '062fe1336459a851bd0ea271bb2afe35',
    type: 'md5',
    analyst: 'john',
    notes: 'FileItem/Md5sum',
    case: 'APT30',
    version: 1
  },


  { ioc: '2.2.21.1',
    type: 'ip',
    analyst: 'Jeo',
    notes: 'IPv4',
    case: 'Bearz',
    version: 1
  },


  { ioc: '1.2.1.1',
    type: 'ip',
    analyst: 'Joel',
    notes: 'IPv4',
    case: 'Bearz',
    version: 1
  },

  { ioc: 'smigroup-online.co.uk',
    type: 'domain',
    analyst: 'john',
    notes: 'DnsEntryItem',
    case: 'APT28',
    version: 1
  },

  { ioc: '3b0ecd011500f61237c205834db0e13a',
    type: 'file',
    analyst: 'mkr',
    notes: 'FileItem/Md5sum',
    case: 'APT28',
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


