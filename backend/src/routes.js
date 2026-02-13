const express = require('express');

const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/posts', postRoutes);

module.exports = routes;