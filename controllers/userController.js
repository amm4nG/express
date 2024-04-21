const db = require('../models');
const {validateDataUser, validationResult} = require('../middleware/validationMiddleware');
const { use } = require('../routes/userRoute');

exports.getAllUser = async (req, res) => {
    try {
        const users = await db.User.findAll(); 
        res.json(users.length > 0 ? users : {data: "Tidak ada data user"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await db.User.findByPk(userId)
        res.json(user ? user : {user: "User Not found"})
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

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        // Cari pengguna berdasarkan ID
        const user = await db.User.findByPk(userId);

        if (!user) {
            // Jika pengguna tidak ditemukan, kirim respons dengan status 404
            return res.status(404).json({ message: 'User not found' });
        }

        // Hapus pengguna dari database
        await user.destroy();

        // Kirim respons dengan status 204 No Content jika pengguna berhasil dihapus
        res.status(200).json({message: "Data user berhasil dihapus"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}