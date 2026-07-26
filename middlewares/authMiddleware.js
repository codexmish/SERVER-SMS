const envConfig = require("../helpers/envConfig");
const { verifiyToken } = require("../helpers/jwt");
const { sendRes } = require("../utils/sendRes");

const authMiddleware = async (req, res, next) => {
  try {
    const { accessToken } = await req.cookies;
    

    if (!accessToken) {
      return sendRes(res, {
        statusCode: 401,
        success: false,
        message: "unauthorized request",
      });
    }

    const decoded = await verifiyToken(accessToken, envConfig.JWT_ACC_SEC);
    
    

    if (decoded) {
      req.user = decoded;
         
      next();
    } else {
      sendRes(res, {
        statusCode: 400,
        success: false,
        message: "unauthorized request",
      });
    }
  } catch (error) {
    sendRes(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

module.exports = authMiddleware;
