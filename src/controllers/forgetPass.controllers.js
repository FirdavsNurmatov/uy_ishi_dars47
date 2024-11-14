import jwt from "jsonwebtoken";
import { User } from "../modules/index.js";
import { sendMail } from "../helpers/mail.js";
import { errorMessages, logger, statusCodes } from "../utils/index.js";

export const forgetPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    const payload = {
      sub: email,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_FORGET_PASSWORD_SECRET,
      {
        expiresIn: process.env.JWT_FORGET_PASSWORD_EXPIRES_IN,
      }
    );

    await sendMail(
      email,
      "Update password link",
      `this is your password link: http://localhost:3000/api/v1/forget/password ${token}`
    );

    res.send("open your email!")
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const forgetPasswordControllerAndUpdateController = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    jwt.verify(
      token,
      process.env.JWT_FORGET_PASSWORD_SECRET,
      async (err, payload) => {
        if (err) {
          return res.status(403).send("Forbidden");
        }
        const currentUser = await User.findOne({ email: payload.sub });
        currentUser.password = password;
        await currentUser.save();
        res.send("updated password");
      }
    );
  } catch (error) {
    logger.error(error);
    next(new ApiError(error.statusCode, error.message));
  }
};
