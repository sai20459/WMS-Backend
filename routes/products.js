const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  const products = await prisma.products.findMany();

  res.data = products;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, price, description, quantity } = req.body;
  const product = await prisma.products.create({
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
  const product = await prisma.products.findUnique({
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
  const product = await prisma.products.update({
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

  const product = await prisma.products.delete({ where: { id: Number(id) } });
  console.log(product);

  next({ status: "200", message: "Product deleted successfully" });
});

module.exports = router;
