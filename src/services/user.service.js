import { User } from "../modules/index.js";
import { ApiError } from "../utils/index.js";

export const updateUserByIdService = async function (id, data) {
  try {
    const { email, password, name, role } = data;
    const currentUser = await User.findById(id);

    if (!currentUser) {
      return {
        status: statusCodes.NOT_FOUND,
        message: errorMessages.USER_NOT_FOUND,
      };
    }

    const updatedData = new User({
      email: email || currentUser.email,
      password: password || currentUser.password,
      name: name || currentUser.name,
      role: role || currentUser.role,
    });

    await updatedData.save();

    return { message: "Updated" };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteUserByIdService = async function (id) {
  try {
    const currentUser = await User.findByIdAndDelete(id);

    return res.send("Deleted");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
