const express = require('express');
const app = express();

app.get('/', (req,res) => res.send("Now we're using Environment Variables."));


// we've useed this line to assign a port to our server before:
// app.listen( 3000, callback() );

// in production we can't use a set number for port number
// because we don't know if the same port is open on our client's system
// so we should use an environment variable named "PORT" if available

// in order to find the PORT env, we use the global object called 'process'
// then we suspect its env (environment variable) property
// and in there we look for the PORT 
// if not available ( || ), we then assign our own arbitrary number
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Looking for the PORT Environment Variable...\nListening on port ${port}...`))

// in order to assign an Environment Variable for PORT: 

// on WSL, GitBash or Linux terminal (temporary) => PORT=3210 nodemon index.js
// on WSL, GitBash or Linux terminal (permenant) => export PORT=3210

// on windows:
// either use the GUI and search for environment variable...
// or in cmd type => set PORT=3210
// or in PowerShell type => $env:PORT = 3210

// on mac open terminal and type => export PORT=3210

// exit the app's process (ctrl+c)
// restart the app (since port is a const)
// and now the app will open on port 3210 by default