import Product from "../models/Product";
<<<<<<< HEAD
import * as Yup from 'yup';
import qr from 'qr-image';
import fs from 'fs';
import generatePDF from '../config/pdf';
=======
import * as Yup from "yup";
import qr from "qr-image";
import fs from "fs";
>>>>>>> upstream/main

class ProductController {
  async store(req, res) {
    /** PARA TESTAR NO INSOMIA: SALVAR PRIMEIRO UMA IMAGEM E USAR ID DA IMAGEM EM IMAGE */

    const schemaValidation = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required().positive(),
      quantity: Yup.number().required().positive().integer(),
      image: Yup.string().required(),
    });

    const checkSchema = await schemaValidation.isValid(req.body);

    if (!checkSchema) {
      return res.status(400).json({ error: "validations fails" });
    }

    const { name, description, price, quantity, image } = req.body;

    try {
      const product = await Product.create({
        name,
        description,
        price,
        quantity,
        image,
      });

      const { _id } = product;
      /** substituir site google pelo site da aplicação com o id do produto em questão */
<<<<<<< HEAD
      
      const qr_png= qr.image('http://localhost:3333/:id', { type: 'png' });
      const qrcode = fs.createWriteStream(`qrcodes/${_id}.png`);
      qr_png.pipe(qrcode);  
=======

      const qr_png = qr.image("http://www.google.com/", { type: "png" });
      const qrcode = fs.createWriteStream(`qrcodes/${_id}.png`);
>>>>>>> upstream/main

      qr_png.pipe(qrcode);

      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new ProductController();
