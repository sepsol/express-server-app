const express = require('express');
const app = express();


// so we had our json object on our server:
const users = [
  {id: 1, fname: 'Sepehr', lname: 'Soltanieh'},
  {id: 2, fname: 'Shideh', lname: 'Bendokht'},
  {id: 3, fname: 'Sahand', lname: 'Soltanieh'}
];


// we still want to be able to see our list of users by a get request:
app.get('/api/users', (req, res) => res.send(users));


// we also want to be able to access our individual users
// by concatenating their id to the end of our request route:
app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {res.status(404).send('User not found!')}
  res.send(user);
});



// ------------ NEW MATERIAL --------------
// in order to process a post request,
// we first need to convert it from whatever it is to standard JSON format
app.use(express.json());
// so we basically told our app to convert the requests to json with express
// we're basically using json as a 'middleware' in our 'request processing pipeline'


// so now we can process 'post' methods:
app.post('/api/users', (req, res) => {
  const user = {  // we first create a new user object from the request body
    id: users.length + 1, // we then automatically assign an id to the new object
    fname: req.body.fname,  // request object has a body property which we care about
    lname: req.body.lname   // we'll find properties of the body that we care about and put them in our object
  };
  users.push(user);   // we then push the new object to our old array of users
  res.send(user);     // by convention we should return the new object as response
  // because its id was assign on server-side and chances are that the client might want to know about the id of this new object
});


// ------------ SIDE NOTES --------------
// browsers typically only send 'get' requests
// unless you specify for them to do otherwise via html or javascript code in the DOM
// here in order to be able to send 'post' requests we'll use an app called 'postman'

// we'll open it up => go to Launchpad tab => click on Create a Request...
// then we set the http method from GET to POST
// after that we specify our request route like this => http://localhost:3000/api/users
// after that we go from 'Params' tab to 'Body' tab on the bottom
// we then change the data type from 'form-data' to 'raw' and 
// select 'JSON' instead of 'Text' from the dropdown next to it
// now we'll define our JSON object to be sent as the body of our request
// after we're finished we'll click on 'Send' button at the top

// hopefully we'll now receive our response
// remember, you shouldn't assign any id to your object
// it'll be assigned on your server for you
// if you receive a statud code of 200, it means everything worked fine


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));