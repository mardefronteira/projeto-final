import ImageProduct from '../models/ImageProduct';

import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('image');

class ImageController {
  async store(req, res) {
    
    upload(req, res, async (error) => {

      if (error) {
        return res.status(400).json('Image: Incompatible format');
      }
      const { originalname, filename } = req.file;
      const image = await ImageProduct.create({
        originalname,
        filename,
      });

      return res.status(200).json(image);
    }); 
  }
}

export default new ImageController();