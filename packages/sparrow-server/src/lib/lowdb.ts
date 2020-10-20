
const Lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const db = new Lowdb(new FileSync('lowdb.json'))

// Seed an empty DB
db.defaults({
  scenes: [],
  components: {},
  tasks: [],
  config: {},
  apis: [],
  plugins: [],
}).write()

export default db;
