const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const { orderValidator } = require("../validations/order");

const router = Router();

router.get("/", async (req, res, next) => {
  const orders = await prisma.order.findMany({
    orderBy: { id: "asc" },
  });
  res.data = orders;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const order = await prisma.order.findUnique({ where: { id: Number(id) } });
  if (!order) throw new BadRequestError(`Order with this ${id} not found`);
  res.data = order;
  next();
});

router.post("/", async (req, res, next) => {
  const { date, providerId } = req.body;
  const order = await prisma.order.create({
    data: {
      providerId: Number(providerId),
      date,
    },
  });
  next({
    status: 200,
    message: `${order.name} product created successfully`,
  });
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { name, address } = await orderValidator.validateAsync(req.body);
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: {
      name,
      address,
    },
  });
  next({
    status: 200,
    message: `${order.name} order updated successfully`,
  });
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const order = await prisma.order.delete({ where: { id: Number(id) } });

  next({
    status: 200,
    message: `${order.name} order deleted successfully`,
  });
});

module.exports = router;
