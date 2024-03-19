const { Router } = require("express");

const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const router = Router();

router.get("/", async (req, res, next) => {
  const location = await prisma.location.findMany({
    orderBy: { id: "asc" },
  });
  res.data = location;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const location = await prisma.location.findUnique({
    where: { id: Number(id) },
  });
  if (!location)
    throw new BadRequestError(`location with this ${id} not found`);
  res.data = location;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, address } = req.body;

  const location = await prisma.location.create({
    data: {
      name,
      address,
    },
  });
  next({
    status: 200,
    message: "location created successfully",
  });
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;

  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const location = await prisma.location.update({
    where: { id: Number(id) },
    data: {
      name,
      address,
    },
  });
  next({
    status: 200,
    message: "location updated successfully",
  });
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const location = await prisma.location.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "location deleted successfully",
  });
});

module.exports = router;
