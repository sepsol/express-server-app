const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hi there!'));



    // /api/users => request route
            // /:id => request route parameter
app.get('/api/users/:id', (req, res) => res.send(`This is USER #${req.params.id}`));
                      // this callback() function is called => Route Handler Function

// we can have multiple (request route) parameters:
app.get('/api/users/:id/:fname', (req, res) => res.send(`Hi, I'm ${req.params.fname} and my id is ${req.params.id}`));


// request route parameters itself is a JSON Object that can be viewed
app.get('/api/users/:id/:fname/:lname', (req, res) => res.send(req.params));

// we can specify OPTIONAL 'Query String Parameters' to filter the data returned from our backend to frontend
// anything that comes after the '?' is optional query string parameters
// anything before it is essential required route parameters

// you can see the Query String Object if you type '?sortBy=name' at the end of this route:
app.get('/api/users/:id/:fname/:lname', (req, res) => res.send(req.query));
// you should use a browser extension to be able to see the query string object



const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));