import argon2 from "argon2";

class auth {
  async hashPassword(password) {
    try {
      return await argon2.hash(password);
    } catch (err) {
      /*Ver qual tipo de erro seria retornado aqui*/
    }
  }

  async validadePassword(password, passwordhash) {
    try {
      if (await argon2.verify(passwordhash, password)) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      /*Ver qual tipo de erro seria retornado aqui*/
    }
  }

  authCheck(req, res) {
    if (!req.session.isLoggedIn || !req.session.user.userID) {
      res.status(401).json({ error: "You are not authorized" });
    } else {
      res.status(200);
    }
  }
}

export default new auth();
