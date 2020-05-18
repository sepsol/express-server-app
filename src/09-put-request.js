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
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {res.status(404).send('User not found!')}
  res.send(user);
});


app.post('/api/users', (req, res) => {

  const { error } = validateNewUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = {
    id: users.length + 1,
    fname: req.body.fname,
    lname: req.body.lname
  };
  users.push(user);
  res.send(user);

});



// now we want to update a post - for that we use the http PUT method:
app.put('/api/users/:id', (req, res) => {
  // steps:
  //  1. look up the our original users array
  //  2. if desired object doesn't exist return 404 - not found
  //    3. validate the new request body
  //    4. if invalid return 400 - bad request
  //        5. otherwise update the course
  //        6. return the updated course (200 - OK which is returned by default)

  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send('User not found!');

  const { error } = validateNewUser(req.body);  // { error } === result.error  => because of 'object destructuring'
  if (error) {res.status(400).send(error.details[0].message); return;}

  user.fname = req.body.fname;
  user.lname = req.body.lname;
  res.send(user);

});



// it's better to have a separate function for validating requests
// so that we don't repeat our logic again and again:
function validateNewUser(request) {

  const schema = {
    fname: Joi.string().min(3),
    lname: Joi.string().max(5).required()
  }

  return Joi.validate(request, schema);  // returns the 'result' object
  
}



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
