const jwt = require("jsonwebtoken");

function createJwtToken(payload, type) {
  const [secret, lifetime] =
    type === "access_token"
      ? [
          process.env.JWT_ACCESS_TOKEN_SECRET,
          process.env.JWT_ACCESS_TOKEN_LIFETIME,
        ]
      : [
          process.env.JWT_REFRESH_TOKEN_SECRET,
          process.env.JWT_REFRESH_TOKEN_LIFETIME,
        ];
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return token;
}

function verifyJwtToken(token, type = "access_token") {
  try {
    const tokenData = jwt.verify(
      token,
      type == "access_token"
        ? process.env.JWT_ACCESS_TOKEN_SECRET
        : process.env.JWT_REFRESH_TOKEN_SECRET
    );
    if (tokenData.exp > Date.now()) return true;
    return tokenData;
  } catch (err) {
    return {
      isErr: true,
      msg: `${err?.name} ${err?.message}`,
    };
  }
}

module.exports = {
  createJwtToken,
  verifyJwtToken,
};
