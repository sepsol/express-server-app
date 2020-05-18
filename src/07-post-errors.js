const express = require('express');
const app = express();

app.use(express.json());

const users = [
  {id: 1, fname: 'Sepehr', lname: 'Soltanieh'},
  {id: 2, fname: 'Shideh', lname: 'Bendokht'},
  {id: 3, fname: 'Sahand', lname: 'Soltanieh'}
];

app.get('/api/users', (req, res) => res.send(users));

app.get('/api/users/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    res.status(404).send('User not found!');
    return;
  }
  res.send(user);
});



// now since we might not what we expect in our response object,
// we want to add some error checking into our post code.
// we can do this by adding simple if - else conditional statements 
// to the top of our request handling function body:
app.post('/api/users', (req, res) => {

  if (!req.body.fname || req.body.fname.length < 3) {   // some conditions - e.g. check if fname is provided and is more than 3 characters long
    res.status(400).send("FName can't be empty and must be longer than 3 characters.");  // we return 400 http code whenever ther's a bad request
    return;  // stop the rest of request hangling function body from executing
  }

  // we can also seperate those conditions and their responses:
  if (!req.body.lname) {
    res.status(400).send("LName can't be empty.");
    return;
  }

  if (req.body.lname.length < 3) {
    res.status(400).send("LName must be longer than 3 characters.");
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



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));