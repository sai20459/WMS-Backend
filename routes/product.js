const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  const product = await prisma.product.findMany();
  res.data = product;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, price, description, quantity } = req.body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      quantity,
      price,
    },
  });
  next({
    status: 200,
    message: "Product created successfully",
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  res.data = product;
  next();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, price, description, quantity } = req.body;

  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const product = await prisma.product.update({
    where: { id: id },
    data: {
      name,
      description,
      quantity,
      price,
    },
  });
  next({ status: 200, message: "Updated successfully" });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const product = await prisma.product.delete({ where: { id: Number(id) } });

  next({
    status: 200,
    message: `${product.name} Product deleted successfully`,
  });
});

module.exports = router;
