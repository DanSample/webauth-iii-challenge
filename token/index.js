function genToken(user) {
  const payload = {
    subject: 'user',
    username: user.username,
    sub: user.id
  };
  const secret = 'secrets.jwtSecret';
  const options = {
    expiresIn: '1hr'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = {
  genToken
};
