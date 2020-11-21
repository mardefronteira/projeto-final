import ImageProduct from "../models/ImageProduct";
import Product from "../models/Product";

import multer from "multer";
import multerConfig from "../config/multer";

const upload = multer(multerConfig).single("image");

class ImageController {
  async store(req, res) {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json("Image: Incompatible format");
      }
      const { originalname, filename } = req.file;
      const image = await ImageProduct.create({
        originalname,
        filename,
      });

      return res.status(200).json(image);
    });
  }
  async update(req, res) {
    const { id } = req.params;
    
    const { image } = await Product.findById(id);

    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json("Image: Incompatible format");
      }
      const { originalname, filename } = req.file;

      const imageUpdate = await ImageProduct.findOneAndUpdate({ _id: image }, {
        originalname,
        filename
      }, {
        useFindAndModify: false,
      });

      return res.status(200).json(imageUpdate);
    });
  }
}

export default new ImageController();
