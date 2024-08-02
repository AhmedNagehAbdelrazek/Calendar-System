const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { tokenSecret } = require('../controllers/authController');

exports.protect = async (req, res, next) => {
    // 1) Check if token exist
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json("you are not logged in");
    }
    const token = req.headers.authorization.split(" ")[1];
    //  2) verify token
    const decoded = jwt.verify(token, tokenSecret);
    // 3) check if user exist
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json("user that belong to this token is no longer exist");
    }
  
    //check if user changed their password after token was issued
  
    // if (user.changedPasswordAfterTokenChanged(decoded.iat)) {
    //   return res.status(401).json("User recently updated there password!, Please log in again");
    // }
  
    req.user = user;
    next();
  };