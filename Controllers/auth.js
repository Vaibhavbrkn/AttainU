const User = require('../models/user')
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const bcrypt = require("bcryptjs");

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.signin = async(req , res)=>{
  const { username, password } = req.body;
  
  User.findOne({ username:username }).exec(async (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that usrename does not exist. Please signup",
      });
    }
    // authenticate
    
    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass) {
      return res.status(400).json({
        error: "username and password does not match",
      });
    }
    console.log(user.name);
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    const { _id, username } = user;
    return res.json({
      token,
      user: { _id,  username},
    });
  });
}

exports.signup = (req, res) => {

  User.findOne({ username: req.body.username }).exec(async (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "username is taken",
      });
    }
    console.log(req.body);
    const { username, password } = await req.body;
    const salt = await bcrypt.genSalt(10);
    const Password = await bcrypt.hash(password, salt);

    const token = jwt.sign(
      { username, Password },
      process.env.JWT_ACCOUNT_ACTIVATION
    );

     user = new User({
      username:username,
      password:Password
    });
    user.save((err, user) => {
          if (err) {
            return res.status(401).json({
              //  error: errorHandler(err)
              err,
            });
          }
          return res.status(200).send(user);
        });
    });

};


exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
});