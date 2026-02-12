const express = require('express');

const authRoutes = require('./routes/auth.route');

const routes = express.Router();

routes.use('/auth', authRoutes);

module.exports = routes;