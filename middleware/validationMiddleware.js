const { body, validationResult } = require('express-validator');
const db = require('../models');

// Fungsi asinkron untuk memeriksa apakah username sudah ada di dalam database
const isUsernameUnique = async (username) => {
  const user = await db.User.findOne({ where: { username: username } });
  return !user; // Mengembalikan true jika username belum ada di dalam database
};

// Fungsi asinkron untuk memeriksa apakah email sudah ada di dalam database
const isEmailUnique = async (email) => {
  const user = await db.User.findOne({ where: { email: email } });
  return !user; // Mengembalikan true jika email belum ada di dalam database
};

exports.validateDataUser = [
    body('username')
    .notEmpty().withMessage('Username tidak boleh kosong')
    .custom(async (value) => {
      if (!(await isUsernameUnique(value))) {
        throw new Error('Username sudah digunakan');
      }
    }),
    
    body('email')
    .notEmpty().withMessage('Email tidak boleh kosong')
    .isEmail().withMessage('Email tidak valid')
    .custom(async (value) => {
        if (!(await isEmailUnique(value))) {
          throw new Error('Email sudah digunakan');
        }
    })
];

exports.validateUpdateDataUser = [
  body('username')
  .notEmpty().withMessage('Username tidak boleh kosong'),

  body('email')
  .notEmpty().withMessage('Email tidak boleh kosong'),

]

exports.validationResult = validationResult;