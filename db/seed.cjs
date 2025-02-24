require('dotenv').config();
const client = require('./client.cjs');
const { createUser } = require('./users.cjs');

const dropTables = async () => {
  try {
    await client.query(`
  DROP TABLE IF EXISTS users;
  `);
  } catch (err) {
    console.log(err);
  }
}


const createTables = async () => {
  try {
    client.query(`
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(60) NOT NULL
    );
  `);

  } catch (err) {
    console.log(err);
  }
}






const syncAndSeed = async () => {
  await client.connect();
  console.log('connected to db')

  console.log('dropping tables');
  await dropTables();
  console.log('tables dropped')

  console.log('creating tables');
  await createTables();
  console.log('tables created');

console.log('creating users');
await createUser('moe','moe1');
await createUser('larry','larry1');
await createUser('curly','curly1');
await createUser('lucy','lucy1');
console.log('users created');


  await client.end();
  console.log('D/C connection')
}

syncAndSeed();