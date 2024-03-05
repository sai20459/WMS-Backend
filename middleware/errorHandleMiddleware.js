const {
  isPrismaClientError,
  toPrismaError,
} = require("../errors/prisma.errors");
// const logger = require("../logger");
// const { writeAccessLog } = require("../utils/jwt");
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err, "ERROR");
  //   logger(
  //     "error",
  //     `${req?.originalUrl}- ${err?.name} -${err?.message}-${err?.lineNumber}-${err?.stack}`
  //   );
  //   if (err?.isJoi) {
  //     writeAccessLog({
  //       req,
  //       action: `${req?.originalUrl}-${err?.name} -${err?.message}-${err?.lineNumber}-${err?.stack}`,
  //       loggerType: "error",
  //     });
  //   }
  let customError = {
    statusCode:
      (err?.isJoi && err?.code === 422) || err.statusCode || err.status || 500,
    msg: err.message || "Something went wrong try again later",
  };
  if (err.isJoi) {
    customError.msg = err.message;
    customError.statusCode = 400;
  } else if (isPrismaClientError(err)) {
    customError.msg = toPrismaError(err);
    customError.statusCode = 400;
  }
  if (customError.statusCode == 500) {
    customError.msg = "Something went wrong, please try later.";
  }
  if (err?.loginsExceeded) {
    return res
      .status(customError.statusCode)
      .json({ message: customError.msg, loginsExceeded: err.loginsExceeded });
  }
  if (err?.code) {
    return res
      .status(customError.statusCode)
      .json({ message: customError.msg, code: err.code });
  }

  return res.status(customError.statusCode).json({ message: customError.msg });
};

module.exports = errorHandlerMiddleware;
