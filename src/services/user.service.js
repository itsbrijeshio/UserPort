const argon2 = require("argon2");
const userModel = require("../models/user.model");
const { AppError } = require("../utils");
const { httpStatus, message } = require("../constants");

class UserService {
  _sanitize = (user) => {
    const { _id, password, __v, ...rest } = user;
    return { ...rest, id: _id };
  };

  _hashPassword = async (password) => {
    return await argon2.hash(password);
  };

  _comparePassword = async (hashPass, password) => {
    return await argon2.verify(hashPass, password);
  };

  signup = async (name, email, password) => {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new AppError(httpStatus.CONFLICT, message.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this._hashPassword(password);
    const user = new userModel({ name, email });
    user.password = hashedPassword;
    await user.save();
    return this._sanitize(user.toObject());
  };

  signin = async (email, password) => {
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, message.INVAlID_CREDENTIAL);
    }

    const isValid = await this._comparePassword(user.password, password);
    if (!isValid) {
      throw new AppError(httpStatus.BAD_REQUEST, message.INVAlID_CREDENTIAL);
    }

    return this._sanitize(user);
  };

  getMe = async (userId) => {
    const user = await userModel.findById(userId).lean();
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    return this._sanitize(user);
  };

  updateMe = async (userId, userData) => {
    const user = await userModel
      .findByIdAndUpdate(userId, userData, {
        new: true,
      })
      .lean();

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    return this._sanitize(user);
  };

  changePassword = async (userId, { oldPassword, newPassword }) => {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    const isValid = await this._comparePassword(user.password, oldPassword);
    if (!isValid) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        message.USER_INVALID_OLD_PASSWORD
      );
    }

    if (oldPassword === newPassword) {
      throw new AppError(httpStatus.BAD_REQUEST, message.USER_PASSWORD_SAME);
    }

    const hashedPassword = await this._hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    return this._sanitize(user.toObject());
  };

  deleteMe = async (userId) => {
    const user = await userModel.findByIdAndDelete(userId).lean();
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    return this._sanitize(user);
  };

  deleteAll = async () => {
    const deletedCount = await userModel.deleteMany();
    return deletedCount;
  };
}

module.exports = new UserService();
