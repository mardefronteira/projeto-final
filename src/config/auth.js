import argon2 from "argon2";

class auth {
  async hashPassword(password) {
      try {
        return argon2.hash(password);
      } catch(err) {
        /*Ver qual tipo de erro seria retornado aqui*/
      }
  }

  async validadePassword(password, passwordhash) {}

  authCheck(req, res) {}
}

export default new auth;
