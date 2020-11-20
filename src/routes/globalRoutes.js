import { Router } from "express";
import multer from "multer";

import ProductController from "../controllers/ProductController";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";
import AuthController from "../controllers/AuthController";

const routes = new Router();
const upload = multer();

/***
 *  METODOS QUE PODEMOS TER NOS CONTROLLERS
index – Lista os dados da tabela
show – Mostra um item específico
create – Retorna a View para criar um item da tabela
store – Salva o novo item na tabela
edit – Retorna a View para edição do dado
update – Salva a atualização do dado
destroy – Remove o dado
 * 
 */


/*Rotas de Produto*/
routes.post("/product", ProductController.store);

/*Rotas de Imagem*/
routes.post("/image", ImageController.store);

/*Rotas de Usuário*/
routes.post("/user", upload.none(), UserController.store);
routes.put("/user", upload.none(), AuthController.authUser, UserController.update);
routes.delete("/user", AuthController.authUser, UserController.delete);

/*Rotas de Login*/
routes.post("/signin", upload.none(), AuthController.store);

/*Rota para testar Auth*/
routes.get("/", AuthController.authUser, function(req, res){ res.json({ user : req.user })});

export default routes;
