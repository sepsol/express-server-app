const express = require('express');
const app = express();


// we can define a JSON array of objects at the top:
const users = [
  {id: 1, fname: 'Sepehr', lname: 'Soltanieh'},
  {id: 2, fname: 'Shideh', lname: 'Bendokht'},
  {id: 3, fname: 'Sahand', lname: 'Soltanieh'}
];


// now we want to return a list of users
// whenever we go to request route of /api/users
app.get('/api/users', (req, res) => res.send(users));


// we can retreive an object from that array like so:
app.get('/api/users/:id', (req, res) => { 
  const user = users.find((user) => user.id /*number*/ === parseInt(req.params.id /*string*/) /*number*/);
  if (!user) {res.status(404).send('User does not exist.')} // we'll return conventional http status code of 404 when nothing's found, along with a message indicating that to the user
  res.send(user); // if the object is found in the array, we'll return it
});


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));