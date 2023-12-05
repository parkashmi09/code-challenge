import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  sectors: [
    {
      group: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
  ],
  agreeToTerms: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
