import { Router } from "express";
import multer from "multer";

import ProductController from "../controllers/ProductController";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";

const routes = new Router();
const upload = multer();

/*Rotas de Produto*/
routes.post("/product", ProductController.store);

/*Rotas de Imagem*/
routes.post("/image", ImageController.store);

/*Rotas de Usuário*/
routes.post("/user", upload.none(), UserController.store);

export default routes;
