import { Router } from "express";
import multer from "multer";

import ProductController from "../controllers/ProductController";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const routes = new Router();
const upload = multer();

/*Rotas de Produto*/
routes.post("/product", ProductController.store);

/*Rotas de Imagem*/
routes.post("/image", ImageController.store);

/*Rotas de Usuário*/
routes.post("/user", upload.none(), UserController.store);
routes.put("/user", upload.none(), AuthController.authUser, UserController.update);

/*Rotas de Login*/
routes.post("/signin", upload.none(), AuthController.signin);

/*Rota para testar Auth*/
routes.get("/", AuthController.authUser, function(req, res){ res.json({ user : req.user })});

export default routes;
