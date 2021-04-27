const router = require('express').Router();
const Report = require('../models/report');

router.route('/').get((req, res) => {
  Report.find()
    .then(reports => res.json(reports))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const report = req.body.report;
  const workStationID = req.body.workStationID;
  const staffID = req.body.staffID;
 
  const newReport = new Report({report,workStationID,staffID});  

  newReport.save()
    .then(() => res.json('Report added!'+ req.body))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;