const builtExternals = require('../config/externals')

module.exports = function (isLibs) {
  return isLibs ? [] : function (context, request, callback) {
    for (let i in builtExternals) {
      if (new RegExp(`${builtExternals[i]}(\.js)?$`, 'g').test(request)) {
        // console.log(`DEPENDCOLLECT[${i}]`)
        return callback(null, `DEPENDCOLLECT[${i}]`)
      }
    }
    callback()
  }
}