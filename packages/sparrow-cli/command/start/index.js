
const userHome = require('user-home');
const mkdirp = require('mkdirp');
const path = require('path');

const SPARROW_PATH = path.join(userHome, '.sparrow');
const SERVER_PATH = path.join(SPARROW_PATH, '.sparrow-server');
// mkdirp
async function start(options = {}) {
  mkdirp(SPARROW_PATH, function (err) {
    if (err) console.error(err)
    else console.log('sparrow!')
  });
  
}

module.exports = (...args) => {
  return start(...args).catch((err) => {
    console.log(err);
    process.exit(1);
  });
}