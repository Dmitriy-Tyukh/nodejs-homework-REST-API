const multer = require('multer');
const path = require('path');
const {verifyEmailValidator, AppError } = require('../utils');


const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir )
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2048,
    }
})

const upload = multer({
  storage: multerConfig,
});

const checkEmail = async (req, res, next) => {
    const { error } = verifyEmailValidator(res.body);
    if (error) return next(new AppError(400, 'missing required field email'));
    next();
};


module.exports = {
  upload,
  checkEmail,
};