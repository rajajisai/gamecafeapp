const router = require('express').Router();
const Request = require('../models/request');

router.route('/').get((req, res) => {
    Request.find()
      .then(requests => res.json(requests))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const wsname = req.body.wsname;
  const reqbody = req.body.reqbody;
  const requestedBy = req.body.requestedBy;

  const newRequest = new Request({wsname,reqbody,requestedBy});

  newRequest.save()
    .then(() => res.json('Request added!'+ req.body))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Request.findByIdAndDelete(req.params.id)
      .then(() => res.json('Request deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;