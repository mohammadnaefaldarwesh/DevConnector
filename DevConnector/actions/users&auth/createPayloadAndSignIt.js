const jwt = require('jsonwebtoken');
const config = require('config');

const createPayloadAndSignIt = (user, res) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
    if (err) throw err;
    return res.json({ token });
  });
};

module.exports = createPayloadAndSignIt;
