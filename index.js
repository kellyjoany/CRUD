const express = require('express');

const server = express();
server.use(express.json());

server.use((req,res,next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();
  console.timeEnd('Request');
})

function checkUsersInArray(req, res, next){
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({error: `Index doesn't exists`});
  }
  req.user = user;
  return next();
}

function checkUsersExist(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: `User name is invalid`});
  }
  return next();
}

const users = ['kelly', 'dani', 'maycon', 'allan'];

server.get('/users/', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUsersInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users/', checkUsersExist, (req, res) => {
  const { name } = req.body;
  /* const { name, age, book } = req.body;
  console.log("nome:", name);
  console.log("idade:", age);
  console.log("livro:", book); */
  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUsersExist, checkUsersInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', checkUsersInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  
  return res.send();
});

server.listen(3000);