const getUser = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

  const [username, password] = credentials.split(':');
  if (username === 'royyan' && password === 'password') {
    return { username };
  }

  return null;
};

module.exports = getUser;
