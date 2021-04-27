const router = require('express').Router();
const express = require("express");
const Customer = require('../models/customer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
const passport = require('passport');

router.route('/').get((req, res) => {
  Customer.find()
    .then(customers => res.json(customers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  const newCustomer = new Customer({name,email});

  newCustomer.save()
    .then(() => res.json('Customer added!'+ req.body))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //Check password length
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password should be atleast 6 characters long" });
  }

  Customer.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    //New User created
    const newUser = new Customer({
      name,
      email,
      password
    });

    //Password hashing
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        // Save user
        newUser
          .save()
          .then(
            res.json({
              msg: "Successfully Registered"
            })
          )
          .catch((err) => console.log(err));
      })
    );
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for existing user
  Customer.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const sessUser = { id: user.id, name: user.name, email: user.email };
      req.session.user = sessUser; // Auto saves session data in mongo store

      res.json({ msg: " Logged In Successfully", auth : true ,sessUser }); // sends cookie with sessionID automatically in response
    });
  });
});
router.post("/glogin", (req, res) => {
  const { email, Name } = req.body;

  // basic validation
  // if (!email || !password) {
  //   return res.status(400).json({ msg: "Please enter all fields" });
  // }
  //check for existing user
  let sessUser = {};
  Customer.findOne({ email }).then((user) => {
    if (!user){
      const name = req.body.name;
      const email = req.body.email;
      const slotsBooked = [];
      const newCustomer = new Customer({name,email,slotsBooked});

      newCustomer.save()
        //  .then(() => res.json('Customer added!'+ req.body))
        //  .catch(err => res.status(400).json('Error: ' + err));
        sessUser = {name : name ,email : email}; 

    }

    else{
      sessUser = { name: user.name, email: user.email };
      // Auto saves session data in mongo store
    }

    console.log(sessUser);
      
    req.session.user = sessUser;
    
    // const payload = { id: user.id, name: user.name, email: user.email  };
    // jwt.sign(
    //   payload,
    //   { expiresIn: 3600 },
    //   (err, token) => {
    //     res.json({
    //       success: true,
    //       token: 'Bearer ' + token
    //     });
    //   }
    // );


    res.json({ msg: " Logged In Successfully", sessUser }); // sends cookie with sessionID automatically in response
    });
});
router.delete("/logout", (req, res) => {
  console.log(req.session)
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie("session-id"); // clears cookie containing expired sessionID
    res.json({ msg: " Logged out " })
  });
}); 

router.get("/authchecker", (req, res) => {
  const sessUser = req.session.user;
  console.log(sessUser);
  if (sessUser) {
    return res.json({ msg: " Authenticated Successfully", sessUser });
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

router.post("/bookSlot",(req,res)=> {
  // const sessUser = req.session.user;
  console.log(req.body.slot)
  slot = req.body.slot;
  Customer.findOne({ email : req.body.email }).then((user) => {
  // console.log(user.slotsBooked);
  console.log(slot)
  if(user.slotsBooked)
    slots = user.slotsBooked;
  else
    slots= []
  if(slots.length == 0)
    slots = [slot]
  else
    slots.push(slot)
  user.slotsBooked = slots;
  // console.log(user.slotsBooked)
  user.save()
      .then(() => res.json('Customer updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
});


module.exports = router;