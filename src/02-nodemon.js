// install this package => npm i (-g) nodemon

// nodemon or Node Mon stands for node monitor
// it automatically detects if the JavaScript file has any changes
// and if it detects an update in the file, it automatically reruns our host for us

// so from now on instead of typing 'node index.js' to run our javascript file
// we run it simply using this command => nodemon index.js

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send("Hi, I'm NodeMon!"));

app.listen(3000, () => console.log("NodeMon is listening on port 3000..."));