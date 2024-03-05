const { Router } = require("express");
const prisma = require("../services/prisma");

const router = Router();

router.get("/meta-data", async (req, res, next) => {
  const userId = req.userDetails.id;
  const userData = await prisma.user.findUnique({ where: { id: userId } });
  res.data = { userData };
  next();
});

module.exports = router;
