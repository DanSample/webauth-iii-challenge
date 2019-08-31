const router = require('express').Router();
const bcrypt = require('bcryptjs');

const genToken = require('../token');
const Users = require('../db-model/users-model');

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  try {
    const newUser = await Users.add(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      err
    });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user.username);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
