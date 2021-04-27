const router = require('express').Router();
const Manager = require('../models/manager');

router.route('/').get((req, res) => {
  Manager.find()
    .then(managers => res.json(managers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const newManager = new Manager({name,email,username,password});

  newManager.save()
    .then(() => res.json('Manager added!'+ req.body))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;