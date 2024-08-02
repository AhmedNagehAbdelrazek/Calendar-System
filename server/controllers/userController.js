const User = require('../models/user');

exports.getUser = async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error getting user', error });
    }
}