const db = require('../models');
exports.getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        res.json(users.length > 0 ? users : {data: null});
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}