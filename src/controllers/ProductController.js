import Product from "../models/Product";
import * as Yup from 'yup';

class ProductController {
  async store(req, res) {

    const schemaValidation = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required().positive(),
      quantity: Yup.number().required().positive().integer(),
      image: Yup.string().required(),
    });

    const checkSchema = await schemaValidation.isValid(req.body);

    if (!checkSchema) {
      return res.status(400).json({ error: 'validations fails' });
    }
    
    const { name, 
      description,
      price,
      quantity,
      image
    } = req.body;

    try {
      const product = await Product.create({
        name,
        description,
        price,
        quantity,
        image
      });

      return res.status(200).json(product);

    } catch(err) {      
      return res.status(400).json(err);
    }
  }
}

export default new ProductController();