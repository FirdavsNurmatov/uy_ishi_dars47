import { logger } from "../utils/index.js";

export const roleGuard = function (roles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      logger.warn("Permisson Denied",req.user)
      res.status(403).send("Permission Denied");
    }
  };
};
