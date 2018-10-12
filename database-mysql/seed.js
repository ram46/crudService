const db = require('./model.js');

db.create(JSON.stringify({"caseName":"APT120", "ioc": "44.exe", "ioctype":"file"}), () => {})
db.create(JSON.stringify({"caseName":"APT100", "ioc": "111.exe","ioctype": "file"}), () => {})
db.create(JSON.stringify({"caseName":"APT100", "ioc": "7.7.7.7","ioctype": "ip"}), () => {})
db.create(JSON.stringify({"caseName":"APT100", "ioc": "111.exe","ioctype": "file"}), () => {})
db.create(JSON.stringify({"caseName":"APT100", "ioc": "7.8.8.7","ioctype": "ip"}), () => {})
db.create(JSON.stringify({"caseName":"APT222", "ioc": "unquwe", "ioctype":"string"}), () => {})
db.create(JSON.stringify({"caseName":"APT101", "ioc": "cbwme", "ioctype":"string"}), () => {})
db.create(JSON.stringify({"caseName":"APT005", "ioc": "12.31.32.12", "ioctype":"ip"}), () => {})

db.update(JSON.stringify({"caseName":"APT222", "fromValue": "unquwe", "toValue":"unquew", "iocType": "string"}), () => {})
db.update(JSON.stringify({"caseName":"APT100", "fromValue": "7.7.7.7","toValue": "5.5.5.5", "iocType": "ip"}), () => {})
db.delete(JSON.stringify({"caseName":"APT100", "ioc": "7.8.8.7", "iocType":"11.exe"}), () => {})
