const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./src/routes.js');


app.listen(3333);
app.use(cors());
app.use(express.json());
app.use(routes);



