const path = require('path')
const cwd = process.cwd()
const os = require('os')
const fs = require('iofs');
function makeProjectPath (src) {
  return path.resolve(cwd, 'projects', src)
}

function makeIp () {
  var ifaces = os.networkInterfaces()
  var ip = '',
    result = []
  for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address
        return;
      }
    })
  }

  return ip || '127.0.0.1'
}


function isArray(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function deepMerge (target = {}) {
  let args = Array.from(arguments);

  for (let i = 0; i < args.length; i++) {
    let source = args[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(i) && source[prop] !== undefined) {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

function copyPublicFolder(source, dest, config = {}) {
  fs.copySync(source, dest, {
    dereference: true,
    ...config
  });
}

module.exports = {
  makeProjectPath,
  makeIp,
  deepMerge,
  copyPublicFolder
}