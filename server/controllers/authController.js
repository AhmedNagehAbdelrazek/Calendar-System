const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenSecret = "aaQ$tw53GqwEFCq34tw"
exports.tokenSecret = tokenSecret;

exports.signup = async (req, res) => {
    const { username, password, email } = req.body; 
  try {
    const user = new User({ username, password, email });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
}

exports.login =async function(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User
            .findOne({ username })
            .select('username password')
            .exec();
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId : user._id }, tokenSecret);
        res.json({ token }).status(200);
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
}
