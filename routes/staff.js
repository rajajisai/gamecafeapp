const router = require('express').Router();
const Staff = require('../models/staff');

router.route('/').get((req, res) => {
    Staff.find()
    .then(staff => res.json(staff))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const newStaff = new Staff({name,email,username,password,type});
    
    newStaff.save()
    .then(() => res.json('Staff added!'+ req.body))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;