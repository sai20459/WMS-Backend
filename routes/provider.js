const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const { orderValidator } = require("../validations/order");

const router = Router();

router.get("/", async (req, res, next) => {
  const Provider = await prisma.Provider.findMany({
    orderBy: { id: "asc" },
  });
  res.data = Provider;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const Provider = await prisma.Provider.findUnique({
    where: { id: Number(id) },
  });
  if (!Provider)
    throw new BadRequestError(`Provider with this ${id} not found`);
  res.data = Provider;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, address } = await orderValidator.validateAsync(req.body);

  const provider = await prisma.Provider.create({
    data: {
      name,
      address,
    },
  });
  next({
    status: 200,
    message: `${provider.name} Provider created successfully`,
  });
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { name, address } = await orderValidator.validateAsync(req.body);
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const Provider = await prisma.Provider.update({
    where: { id: Number(id) },
    data: {
      name,
      address,
    },
  });
  next({
    status: 200,
    message: `${Provider.name} Provider updated successfully`,
  });
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const Provider = await prisma.Provider.delete({ where: { id: Number(id) } });

  next({
    status: 200,
    message: `${Provider.name} Provider deleted successfully`,
  });
});

module.exports = router;
