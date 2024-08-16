const jwt = require('jsonwebtoken');

const userLogin = (req, res) => {
  const { username, password } = req.body;

  if (username !== 'royyan' || password !== 'pass') {
    return res.status(401).json({ message: 'Username or password is wrong' });
  }

  const token = jwt.sign({ username }, 'rahasia', { expiresIn: '1h' });
  res.status(200).json({ token });
};

module.exports = { userLogin };
