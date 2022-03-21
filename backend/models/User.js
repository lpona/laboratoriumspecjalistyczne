import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Returns new user object converted
 * from mongoose type to custom one.
 * Removes password field.
 */
userSchema.methods.toUserObject = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;
