const User = require('../models/user')

exports.address = (req , res)=>{
  const address = req.body.address 
  console.log(req.user)
  const username = req.user.username
  console.log(username)
  User.findOne({ username:username }).exec(async (err, user) => {
    console.log(user)
    if (err || !user) {
      return res.status(400).json({
        error: "User with that usrename does not exist. Please signup",
      });
    }
    user.address = address;

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
}