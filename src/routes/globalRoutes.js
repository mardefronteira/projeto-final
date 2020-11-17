import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const routes = new Router();

routes.post('/product', ProductController.store);


export default routes;