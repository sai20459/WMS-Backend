const { Router } = require("express");

const prisma = require("../services/prisma");

const { BadRequestError } = require("../errors/errors");
// const { orderValidator } = require("../validations/order");

const router = Router();

router.get("/", async (req, res, next) => {
  const orderDetail = await prisma.orderDetail.findMany({
    orderBy: { id: "asc" },
  });
  res.data = orderDetail;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const orderDetail = await prisma.orderDetail.findUnique({
    where: { id: Number(id) },
  });
  if (!orderDetail)
    throw new BadRequestError(`orderDetail with this ${id} not found`);
  res.data = orderDetail;
  next();
});

router.post("/", async (req, res, next) => {
  const { quality, expectedDate, actualDate, orderId, productId, warehouseId } =
    req.body;

  const orderDetail = await prisma.orderDetail.create({
    data: {
      quality,
      expectedDate,
      actualDate,
      orderId,
      productId,
      warehouseId,
    },
  });
  next({
    status: 200,
    message: "orderDetail created successfully",
  });
});
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { quality, expectedDate, actualDate } = req.body;

  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const orderDetail = await prisma.orderDetail.update({
    where: { id: Number(id) },
    data: {
      quality,
      expectedDate,
      actualDate,
    },
  });
  next({
    status: 200,
    message: "orderDetail updated successfully",
  });
});
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const orderDetail = await prisma.orderDetail.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "orderDetail deleted successfully",
  });
});

module.exports = router;
