const db = require('../models');

exports.getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        res.json(users.length > 0 ? users : {data: null});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await db.User.findByPk(userId)
        res.json(user ? user : {user: "Not found"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}