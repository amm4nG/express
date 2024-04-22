const db = require('../models');
const { validateUpdateDataUser, validateDataUser, validationResult } = require('../middleware/validationMiddleware');
const { use } = require('../routes/userRoute');
const multer = require('multer');

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

// add new user
exports.addUser = [
    multer().none(),
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

exports.updateUser = [
    multer().none(),
    validateUpdateDataUser,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const firstErrorMessage = errors.array()[0].msg
            return res.status(400).json({error: firstErrorMessage})
        }

        const userId = req.params.id
        const { username, email } = req.body

        try {
            const user = await db.User.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const usernameUserOther = await db.User.findOne({ where: { username: username } });
            const emailUserOther = await db.User.findOne({ where: { email: email } });

            if(usernameUserOther && usernameUserOther.username != user.username){
                return res.status(400).json({message: "Username telah digunakan"})
            }else if(emailUserOther && emailUserOther.email != user.email){
                return res.status(400).json({message: "Email telah digunakan"})
            }
            
            // Update username dan email jika ada dalam request body
            if (username) {
                user.username = username;
            }
            if (email) {
                user.email = email;
            }
            // Simpan perubahan
            user.save();

            res.json({ message: 'Data user berhasil diupdate', user });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
]

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // direktori penyimpanan file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // nama file yang disimpan
  }
});

const upload = multer({ storage: storage });
exports.uploadImage = (req, res) => {
    // Gunakan upload.single('image') untuk menangani upload file tunggal dengan nama 'image'
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Aksi jika terjadi kesalahan Multer
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengupload gambar' });
    } else if (err) {
      // Aksi jika terjadi kesalahan lain
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengupload gambar' });
    }
    // Jika berhasil, berikan respons berhasil
    return res.status(200).json({ message: 'Gambar berhasil diupload' });
  });
}