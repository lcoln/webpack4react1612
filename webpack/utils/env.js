const PROJECT = process.argv.slice(2)
const ENV = PROJECT.map(v => ({
  MODE: process.env.MODE.toLocaleLowerCase(),
  ENV: process.env.ENV,
  PROJECT: v
}))
module.exports = ENV