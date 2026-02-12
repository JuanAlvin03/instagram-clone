import { Router } from "express";

const authRoutes = require('./routes/auth.route');

const routes = Router();

routes.use('/auth', authRoutes);

export default routes;