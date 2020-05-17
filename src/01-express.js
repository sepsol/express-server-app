// first do => npm init
// then => npm i express
const express = require('express'); // load ExpressJS to the app
const app = express();              // run create app function and save the return object in a variable

// this object has http methods inside itself
// app.get()
// app.post()
// app.put()
// app.delete()

// we're sending 'hello world' from our mount path or route ("/") to users 
// if they send a request to us with 'http get' method:
app.get( '/', (req, res) => {res.send('Hello, world!')} );
// we can even add more routes to our server:
app.get( '/api/users', (req, res) => {res.send( [2, 3, 5, 7] )} );


// that route has to have a main domain for it to be hosted on to be able to listen to events
app.listen( 3000, () => {console.log(`Listening on port 3000...`)} )
// now our server is hosted locally at port 3000 => localhost:3000
// and all of the routes above will be concatenated to this domain address as this => localhost:3000/api/users

// NOTE:
// you have to first run => node index.js => to run the js file
// and then you can head back over to your browser and type the address