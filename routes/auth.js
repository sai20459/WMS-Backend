const { Router } = require("express");

const router = Router();
const prisma = require("../services/prisma");

const { createJwtToken, verifyJwtToken } = require("../utils/jwt");

const { loginValidator, signupValidator } = require("../validations/auth");
const { NotFoundError } = require("../errors/errors");

router.post("/login", async (req, res, next) => {
  const { email, password } = await loginValidator.validateAsync(req.body);

  const user = await prisma.user.findUnique({ where: { email, password } });
  if (!user) throw new NotFoundError("No user found");

  const access_token = createJwtToken({ id: user.id }, "access_token");
  const refresh_token = createJwtToken({ id: user.id }, "refresh_token");

  const loginRecord = await prisma.login.update({
    where: { user_id: user.id },
    data: {
      access_token,
      refresh_token,
      access_token_created_at: new Date().toISOString(),
    },
  });

  res.data = { ...loginRecord, ...user };
  next();
});

router.post("/signup", async (req, res, next) => {
  const { email, password, first_name, last_name, gender, dob } =
    await signupValidator.validateAsync(req.body);

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password,
        first_name,
        last_name,
        gender,
        dob,
      },
    });
  } else {
    throw new Error("User already exists, Try to login");
  }

  const access_token = createJwtToken({ id: user.id }, "access_token");
  const refresh_token = createJwtToken({ id: user.id }, "refresh_token");

  const loginRecord = await prisma.login.create({
    data: {
      access_token,
      refresh_token,
      access_token_created_at: new Date().toISOString(),
      user_id: user.id,
    },
  });
  res.data = { ...user, ...loginRecord };
  next();
});

// router.get("/", async (req, res, next) => {
//   const users = await prisma.user.findMany();
//   res.data = { users };
//   next();
// });

module.exports = router;
