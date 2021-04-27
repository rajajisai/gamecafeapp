const router = require('express').Router();
let workStation = require('../models/workstation');

router.route('/').get((req, res) => {
    workStation.find()
      .then(workstations => res.json(workstations))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/add').post((req, res) => {
    let slots=[
      {
      startTime:"9AM",
      isBooked: false
        },
      {
      startTime:"10AM",
      isBooked: false
        },
        {
          startTime:"11AM",
          isBooked: false
            },
            {
              startTime:"12PM",
              isBooked: false
                },
                {
                  startTime:"1PM",
                  isBooked: false
                    },
                    {
                      startTime:"2PM",
                      isBooked: false
                        },
                        {
                          startTime:"3PM",
                          isBooked: false
                            },
                            {
                              startTime:"4PM",
                              isBooked: false
                                },
                                {
                                  startTime:"5PM",
                                  isBooked: false
                                    }
  ]
    let games= [
      "Red Dead Redemption 2",
      "FIFA 2021",
      "NBA 2k21",
      "Spiderman",
      "GTA V",
      "CS:GO"
    ]


    const newWorkStation = new workStation({
      slots: slots,
      name:req.body.name,
      pic:req.body.pic,
      date:req.body.date,
      rent:req.body.rent,
      config:
      {
          games:games
      }
    })
    // workstat = req.body   
  
    newWorkStation.save()
      .then(() => res.json('Work Station added'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  workStation.findById(req.params.id)
    .then(workstation => res.json(workstation))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  workStation.findByIdAndDelete(req.params.id)
    .then(() => res.json('workstation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  workStation.findById(req.params.id)
    .then(workstation => {
      workstation.slots = req.body.slots;
      workstation.config = req.body.config;
      workstation.rent = req.body.rent;
      workstation.name = req.body.name;
      workstation.pic = req.body.pic;
      workstation.date = req.body.date;
      


      workstation.save()
        .then(() => res.json('workstation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// slots:[
//     {
//         startTime : String,
//         endTime : String,
//         isBooked : {type : Boolean, "default" : false},
//         bookedBy : {type : Object, "default" : null}

//     }    
// ],
// name:String,
// pic:String,
// type:String,
// config:{
//     games:[]
//     }

module.exports = router;