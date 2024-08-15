const auth = (req, res, next) => {
  let authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required." });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [username, password] = credentials.split(":");

  if (username === "royyan" && password === "ggez") {
    req.user = { username };
    next();
  } else {
    return res.status(401).json({ message: "Invalid credentials." });
  }
};

export { auth };
