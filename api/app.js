// Imports
const express = require("express");
const cors = require("cors");
const logRoutes = require("./middleware/logger");

// Routers

const eventRouter = require('./routes/eventRoutes')
const linkRouter = require('./routes/linkRoutes')


// Middleware
const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

//Routes
api.get("/", (req, res) => {
	res.status(200).send("welcome");
});

api.use('/event', eventRouter)
api.use('/link', linkRouter)


module.exports = api;
