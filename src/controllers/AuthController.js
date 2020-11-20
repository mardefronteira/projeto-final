import User from "../models/User";
import auth from "../config/auth";

import jwt from "jsonwebtoken";

class AuthController {
  async signin(req, res) {
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

    const token = jwt.sign({ id }, process.env.SECRET);

    return res.status(200).json({ auth: true, token });
  }

  async authUser(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ auth: false, error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        req.userID = decoded.id;
        next();
    } catch (err) {
        return res.status(500).json({ auth: false, error: "Failed to authenticate token" });
    }
  }
}

export default new AuthController();
