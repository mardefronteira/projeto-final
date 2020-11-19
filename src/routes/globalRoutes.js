import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import ImageController from '../controllers/ImageController';

const routes = new Router();

routes.post('/product', ProductController.store);
// routes.get('/:id', )
routes.post('/image', ImageController.store);

export default routes;