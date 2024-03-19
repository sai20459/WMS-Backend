const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const router = Router();

router.get("/", async (req, res, next) => {
  const details = await prisma.deliveryDetails.findMany();
  res.data = details;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const deliveryDetails = await prisma.deliveryDetails.findUnique({
    where: { id: Number(id) },
  });
  res.data = deliveryDetails;
  next();
});

router.post("/", async (req, res, next) => {
  const {
    quantity,
    expectedDate,
    actualDate,
    deliverId,
    productId,
    warehouseId,
  } = res.body;
  const deliveryDetails = await prisma.deliveryDetails.create({
    data: {
      quantity,
      expectedDate,
      actualDate,
      deliverId,
    },
  });
  next({
    status: 200,
    message: "Created successfully",
  });
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    quantity,
    expectedDate,
    actualDate,
    deliverId,
    productId,
    warehouseId,
  } = res.body;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const deliveryDetails = await prisma.deliveryDetails.update({
    data: {
      quantity,
      expectedDate,
      actualDate,
      deliverId,
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

  const deliveryDetails = await prisma.deliveryDetails.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "Deleted successfully",
  });
});

module.exports = router;
