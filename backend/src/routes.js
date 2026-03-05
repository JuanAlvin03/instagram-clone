const express = require('express');

const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route');
const userRoutes = require('./routes/user.route');

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/posts', postRoutes);
routes.use('/users', userRoutes);

module.exports = routes;