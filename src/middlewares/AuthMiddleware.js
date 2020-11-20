import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ auth: false, error: "No token provided" });
  }

  try {
    req.user = jwt.verify(token, process.env.SECRET);

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ auth: false, error: "Failed to authenticate token" });
  }
}