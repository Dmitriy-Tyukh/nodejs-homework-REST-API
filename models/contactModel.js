const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      require: [true, 'Todo must have an owner ..'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;