const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  const token = auth.split(" ")[1];
  if (token == null) {
    return res.status(401).json({ message: "Unauthorize" });
  }

  jwt.verify(token, "rahasia", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
};

module.exports = { authMiddleware };
