const jwt = require("jsonwebtoken");

const createToken = (payload, secret, expiresIn) => {
  const token = jwt.sign(payload, secret, expiresIn);
  return token;
};

const verifiyToken = (token, secret) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error) {
    console.log("token verification failed");
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { verifiyToken, createToken };