const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const router = Router();

router.get("/", async (req, res, next) => {
  const transfer = await prisma.transfer.findMany();
  res.data = transfer;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const transfer = await prisma.transfer.findUnique({
    where: { id: Number(id) },
  });
  res.data = transfer;
  next();
});

router.post("/", async (req, res, next) => {
  const { quantity, sentDate, receivedDate, productId, warehouseId } = res.body;
  const transfer = await prisma.transfer.create({
    data: {
      sentDate,
      quantity,
      receivedDate,
      productId,
      warehouseId,
    },
  });
  next({
    status: 200,
    message: "Created successfully",
  });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { quantity, sentDate, receivedDate, productId, warehouseId } = res.body;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const transfer = await prisma.transfer.update({
    data: {
      sentDate,
      quantity,
      receivedDate,
      productId,
      warehouseId,
    },
  });
  next({
    status: 200,
    message: "Updated successfully",
  });
  next();
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const transfer = await prisma.transfer.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "Deleted successfully",
  });
});

module.exports = router;
