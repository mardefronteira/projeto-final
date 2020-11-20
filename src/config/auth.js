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
}

export default new auth();
