const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "Ankitisagood$boy";
var fetchuser=require("../middleWare/fetchuser")

// Route 1 :create a user using :Post "/api/auth/createUsers" => No login required

router.post(
  "/createUsers",
  // this body contains validations
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 3 }),
  ],
  // passing request and response
  async (req, res) => {
    let success=false
    // res.json([]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success =false
      return res.status(400).json({ success ,errors: errors.array() });
    }
    try {
      // checking whether the user with this email exists
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        success=false
        return res
          .status(400)
          .json({ success,error: `User with email ${req.body.email} already exists` });
      }

      // using password hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      res.json({success, authToken });
    } catch (error) {
      success=false
      console.log(error.message);
      res.status(500).send("some error occured");
    }
    // console.log(user,'User')
    //   .then((user) => res.json(user))
    //   .catch((err) => {
    //     console.log(err);
    //     res.json({
    //       error: "please enter a unique value for email",
    //       message: err.message,
    //     });
    //   });

    // res.send(req.body);

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);
  }
);

//Route 2: authenticate a user :post "api/auth/login" => no login required

router.post(
  "/loginUsers",
  // this body contains validations
  [
    body("email", "Enter a valid email").isEmail(),
    //   body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "password cannot be blank").exists(),
  ],
  // passing request and response
  async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring
    // getting email and passord out of the body
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ success,error: "incorrect credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({success, error: "incorrect credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      success=true
      res.json({success, authToken }) ;
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//Route 3 : get loggedin user details =>login required
// we need to decode the auth token and then get our user id from that token
router.post(
  "/userDetails",
  // this body contains middleware because we need to write this everywhere if logged in details are required
  // we can skip this by using a middle ware
  fetchuser,
  // passing request and response
  async (req, res) => {
    try {
      userId = req.user.id;
      let user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
