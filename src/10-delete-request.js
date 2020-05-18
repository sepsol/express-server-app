const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());



const users = [
  {id: 1, fname: 'Sepehr', lname: 'Soltanieh'},
  {id: 2, fname: 'Shideh', lname: 'Bendokht'},
  {id: 3, fname: 'Sahand', lname: 'Soltanieh'}
];



app.get('/', (req, res) => res.send('Hello, world!'));
app.get('/api/users', (req, res) => res.send(users));
app.get('/api/users/:id', (req, res) => {
  // 1  id => yes => find & validate
  // 2  reqBody => no
  // 3  res => calculate => send

  const user = users.find(user => userid=== parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found!');

  res.send(user);
});


app.post('/api/users', (req, res) => {
  // 1  id => no
  // 2  reqBody => yes => validate
  // 3  res => calculate => send

  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = {
    id: users.length + 1,
    fname: req.body.fname,
    lname: req.body.lname
  };
  users.push(user);

  res.send(user);
});


app.put('/api/users/:id', (req, res) => {
  // 1  id => yes => find & validate
  // 2  reqBody => yes => validate
  // 3  res => calculate => send

  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found!');

  const { error } = validateNewUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.fname = req.body.fname;
  user.lname = req.body.lname;

  res.send(user);
});


app.delete('/api/users/:id', (req, res) => {
  // 1  id => yes => find & validate
  // 2  reqBody => no
  // 3  res => calculate => send

  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found!');

  const index = users.indexOf(user);  // goes in the array and searches for 'user' item and returns its index
  users.splice(index, 1);   // removes the 1 item from our specified index from the users array

  res.send(user);
});



function validateNewUser(reqBody) {
  const schema = {
    fname: Joi.string().min(3),
    lname: Joi.string().max(5).required()
  };
  return Joi.validate(reqBody, schema);
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));