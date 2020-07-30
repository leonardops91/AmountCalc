const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3333;

const app = express();
const routes = require('./src/routes.js');


app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, function(){
    console.log('Listenning on port PORT', PORT);
});


