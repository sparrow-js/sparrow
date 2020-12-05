
const Lowdb = require('lowdb')
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = Lowdb(adapter);

// Seed an empty DB
db.defaults({
  scenes: [],
  components: {},
  tasks: [],
  config: {},
  apis: [],
  plugins: [],
  preview_view_status: 0
}).write()

export default db;
