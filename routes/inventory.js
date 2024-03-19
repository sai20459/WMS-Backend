const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");
const router = Router();

router.get("/", async (req, res, next) => {
  const inventory = await prisma.inventory.findMany();
  res.data = inventory;
  next();
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const inventory = await prisma.inventory.findUnique({
    where: { id: Number(id) },
  });
  res.data = inventory;
  next();
});

router.post("/", async (req, res, next) => {
  const {
    quantityAvailabele,
    minStockLevel,
    maxStockLevel,
    ReorderPoint,
    productId,
  } = res.body;
  const inventory = await prisma.inventory.create({
    data: {
      quantityAvailabele,
      minStockLevel,
      maxStockLevel,
      ReorderPoint,
      productId,
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
    quantityAvailabele,
    minStockLevel,
    maxStockLevel,
    ReorderPoint,
    productId,
  } = res.body;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const inventory = await prisma.inventory.update({
    data: {
      quantityAvailabele,
      minStockLevel,
      maxStockLevel,
      ReorderPoint,
      productId,
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

  const inventory = await prisma.inventory.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: "Deleted successfully",
  });
});

module.exports = router;
