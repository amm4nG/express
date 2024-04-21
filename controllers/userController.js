const db = require('../models');
const {validateDataUser, validationResult} = require('../middleware/validationMiddleware');
const { use } = require('../routes/userRoute');
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

exports.addUser = [
    validateDataUser,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const firstErrorMessage = errors.array()[0].msg
                return res.status(400).json({error: firstErrorMessage})
            }
            const {username, email} = req.body
            const newUser = await db.User.create({
                username: username,
                email: email
            })
            res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
]