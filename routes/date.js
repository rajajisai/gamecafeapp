const router = require('express').Router();
const date = require('../models/date');

router.route('/').get((req, res) => {
    date.find()
      .then(dates => res.json(dates))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/add').post((req, res) => {
    

    const newdate = new date(req.body);
    // workstat = req.body   
  
    newdate.save()
      .then(() => res.json('Date added'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  date.findById(req.params.id)
    .then(date => res.json(date))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  date.findByIdAndDelete(req.params.id)
    .then(() => res.json('date deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  date.findById(req.params.id)
    .then(date => {
      date.slots.startTime = req.body.slots.startTime;
      date.slots.endTime = req.body.slots.endTime;
      date.slots.isBooked = Number(req.body.slots.isBooked);
      date.slots.bookedBy = Date.parse(req.slots.body.bookedBy);

      date.save()
        .then(() => res.json('date updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
