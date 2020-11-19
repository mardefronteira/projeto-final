import User from "../models/User";
import auth from "../config/auth";

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
        const name = userExist.name;
    
        /*salvar token JWT*/
    
        return res.status(200).json({ id, name });
      }
}

export default new AuthController();