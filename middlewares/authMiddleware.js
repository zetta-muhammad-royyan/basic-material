const jwt = require("jsonwebtoken");

const authMiddleware = async (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return null;
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, "rahasia", (err, user) => {
      if (err) {
        reject(new Error(err.message));
      } else {
        resolve(user);
      }
    });
  });
};

module.exports = authMiddleware;
