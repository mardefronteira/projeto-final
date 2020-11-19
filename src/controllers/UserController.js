import User from "../models/User";
import auth from "../config/auth";

import * as Yup from "yup";

class UserController {
  async store(req, res) {
    const schemaValidation = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    });

    const checkSchema = await schemaValidation.isValid(req.body);

    if (!checkSchema) {
      return res.status(400).json({ error: "validations fails" });
    }

    const { name, username, email, password } = req.body;

    const passwordhash = await auth.hashPassword(password);

    try {
      const user = await User.create({
        name,
        username,
        email,
        passwordhash,
      });

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default new UserController();
