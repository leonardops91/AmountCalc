const express = require('express');
const routes = express.Router();

const calculateSimpleInterest = require('./controllers/simpleAmountController');
const calculateCompoundInterest = require('./controllers/compoundAmountController');

routes.post('/simple', calculateSimpleInterest.calculate);

routes.post('/compound', calculateCompoundInterest.calculate);

module.exports = routes;