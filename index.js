require('dotenv').config();
const express = require('express');
const routes = require('./routes');
// create express app
const app = express();
// parse requests of content-type - application/json
app.use(express.json());
// import the router
app.use(routes);
// Setup server port
const port = process.env.PORT || 5000;
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
