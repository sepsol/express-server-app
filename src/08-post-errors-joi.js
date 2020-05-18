// we can also use a framework called joi
// to make our error handling easier
// install it with => npm i joi

const Joi = require('joi');  // it returns a class, so we capitalize its first letter (Pascal capitalization) by convention
const express = require('express'); // returns create app function
const app = express();  // returns an object which has some methods and properties

app.use(express.json());

const users = [
  {id: 1, fname: 'Sepehr', lname: 'Soltanieh'},
  {id: 2, fname: 'Shideh', lname: 'Bendokht'},
  {id: 3, fname: 'Sahand', lname: 'Soltanieh'}
];



// to handle error checking with joi,
// first we have to define a 'schema'.
// a schema defines the shape of our objects (in our array of objects).
// e.g. what properties do we have, what is the type of each property, do we have an email, do we have a string or a number, what is the minimum length, etc...

// so we'll define a 'schema object' to validate our 'request object' against it:
const schema = {
  fname: Joi.string().min(3),
  lname: Joi.string().max(5).required()
};



app.get('/', (req, res) => res.send('Hello, world!'));
app.get('/api/users', (req, res) => res.send(users));
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {res.status(404).send('User not found!')}
  res.send(user);
});



app.post('/api/users', (req, res) => {



  // now we have to validate our 'request object' against our 'schema object':
  const result = Joi.validate(req.body, schema);  // this returns an object which we'll store in result

  console.log(result)
  // returns this object:
  // {
  //   error: null,
  //   value: {fname: 'xxxx', lname: 'xxx'},
  //   then: [Function then],
  //   catch: [Function catch]
  // }

  // error and value properties can't both have values, one of them must return null
  // then and catch are functions for async js

  if (result.error) {console.log(result.error)}
  // this returns another object that looks something like this:
  // {
  //   isJoi: true,
  //   fname: "ValidationError",
  //   details: [
  //     { message: "fname is required", path: ..., ...},
  //     { ... },
  //     { ... },
  //     ...
  //   ]
  // }

  // so in case of an errorwe want to return only the message property of the first index (or all indeces by looping) details array of error property of result object :)
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  // now test the output by sending some faulty values to the server with postman



  const user = {
    id: users.length + 1,
    fname: req.body.fname,
    lname: req.body.lname
  };
  users.push(user);
  res.send(user);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));