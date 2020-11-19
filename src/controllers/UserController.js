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

    /*** acho que não vamos precisar de username */
    const usernameExist = await User.findOne({ username });
    const emailExist = await User.findOne({ email });

    if (emailExist || usernameExist) {
      return res.status(400).json({ error: "email or username already exist" });
    }

    const passwordhash = await auth.hashPassword(password);

    try {
      const { id } = await User.create({
        name,
        username,
        email,
        passwordhash,
      });

      return res.status(200).json({ id, name, username, email });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async signin(req, res) {
    /*A validação se os dados foram preenchidos ou não devem ser feitos via Yup?*/

    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(422).json({ error: "email isn't registered" });
    }

    const isValid = await auth.validadePassword(
      password,
      userExist.passwordhash
    );

    if (!isValid) {
      return res.status(422).json({ error: "incorrect password" });
    }

    const id = userExist._id;
    const name = userExist.name;

    /*req.session.isLoggedIn = true;*/
    /*req.session.user = { id, name };*/

    return res.status(200).json({ id, name });
  }
}

export default new UserController();
