const { sendRes } = require("../utils/sendRes");

const roleCheckMiddleware = async (Roles) => {
  return (req, res, next) => {
    if (Array.isArray(Roles) && Roles.length > 0) {
      if (Roles.includes(req.user.data.role)) {
        next();
      } else {
        sendRes(res, {
          statusCode: 400,
          success: false,
          message: "Forbidden",
        });
      }
    } else {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "Forbidden",
      });
    }
  };
};

module.exports = roleCheckMiddleware;
