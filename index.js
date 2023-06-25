'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/models/index.js');

db.sync(
  // {force:true} // with this statement i drop all the tables in the db , once i drop them i should comment this because it will drop the etables again
).then(() => {
  app.start(process.env.PORT || 3001);
}); 
