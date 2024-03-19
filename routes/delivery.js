const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const router = Router();

router.get("/", async (req, res, next) => {
  const delivery = await prisma.delivery.findMany();
  res.data = delivery;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const delivery = await prisma.delivery.findUnique({
    where: { id: Number(id) },
  });
  res.data = delivery;
  next();
});

router.post("/", async (req, res, next) => {
  const { saleData, customerId } = res.body;
  const delivery = await prisma.delivery.create({
    data: {
      saleData,
      customerId,
    },
  });
  next({
    status: 200,
    message: "Created successfully",
  });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { saleData, customerId } = res.body;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const delivery = await prisma.delivery.update({
    data: {
      saleData,
      customerId,
    },
  });
  next({
    status: 200,
    message: "Updated successfully",
  });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const delivery = await prisma.delivery.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "Deleted successfully",
  });
});

module.exports = router;
