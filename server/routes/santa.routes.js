const { Router } = require("express");
const santaController = require('../controllers/santa.controller');

const santaRouter = Router();

santaRouter.post('/request', santaController.submitRequest);
santaRouter.get('/pending', santaController.getPendingRequests);

module.exports = { santaRouter };