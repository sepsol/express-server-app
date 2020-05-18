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

//



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(''));