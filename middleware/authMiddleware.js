const prisma = require("../services/prisma");
const { verifyJwtToken } = require("../utils/jwt");
const {
  UnAuthenticatedError,
  UnAuthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors");
async function authenticateMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    throw new UnAuthenticatedError(
      "Authentication is required for this operation. Please include a header with your credentials."
    );
  let token;
  let tokenData;

  if (authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1];

  if (token) tokenData = verifyJwtToken(token);
  if (!token || tokenData?.isErr) {
    // writeAccessLog({ req, userId: "", action: `${tokenData?.msg}` });
    next({
      status: 401,
      message:
        "We're sorry, but the token you are using is not valid. Please try again with a valid token.",
      code: "token_not_valid",
    });
  }

  const isTokenBlackListed = await prisma.login.findUnique({
    where: { access_token: token },
  });
  if (!isTokenBlackListed) {
    next({
      status: 401,
      message:
        "You are no longer authenticated with this token. Please log in again to continue.",
      code: "invalid_credentials",
    });
  }

  const isValidUser = await prisma.user.findUnique({
    where: { id: tokenData.id },
  });
  if (!isValidUser)
    throw new NotFoundError(
      `We could not locate an account with the specified information. Please check your details and try again.`
    );

  req.userDetails = {
    ...tokenData,
    ...isValidUser,
  };
  req.token = token;
  next();
}

function authorizeMiddleware(req, res, next) {
  if (req.userDetails.role == "admin") next();
  else throw new UnAuthorizedError("Access denied");
}

module.exports = {
  authenticateMiddleware,
  authorizeMiddleware,
};
