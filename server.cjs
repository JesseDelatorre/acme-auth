const client = require('./db/client.cjs');
client.connect();
const { authenticateUser } = require('./db/users.cjs');
const express = require('express');
const app = express();

app.use(express.json());


app.get('/', (req, res, next) => {
  res.send('welcome');
})

app.post('/api/v1/login', async(req, res, next) => {
  // console.log(req.body);
  const { username, password } = req.body;
  try{
const token = await authenticateUser(username, password);
res.send({ token: token });
  }catch(err) {
    next(err);
  }
});



app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
});