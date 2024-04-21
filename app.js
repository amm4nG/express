const express = require('express')
const app = express()

// const models = require('./models/index'); // Sesuaikan dengan lokasi model Anda
const db = require('./models'); // Impor objek db dari index.js
app.get('/users', async (req, res) => {
  try {
    const users = await db.User.findAll(); // Mengambil semua data pengguna dari basis data
    res.json(users); // Mengirimkan data pengguna sebagai respons JSON
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message }); // Menangani kesalahan server
  }
});


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`);
})