import User from "../models/User";
import auth from "../config/auth";

import jwt from "jsonwebtoken";

class AuthController {
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

        const token = jwt.sign({ id }, process.env.SECRET);
    
        return res.status(200).json({ auth : true, token });
      }
}

export default new AuthController();