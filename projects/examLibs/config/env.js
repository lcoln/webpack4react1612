module.exports = function (mode) {
  return {
    BASE_API: mode === '"PORD"' ? 'prod' : 'dev'
  }
}