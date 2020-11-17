import Product from "../models/Product";

class ProductController {
  async store(req, res) {
    const { name, 
      description,
      price,
      quantity,
      image
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      image
    });

    return res.json(product);
  }
}

export default new ProductController();