module.exports = function (mode) {
  return {
    BASE_API: mode === 'PROD' ? 'prod' : 'dev'
  }
}