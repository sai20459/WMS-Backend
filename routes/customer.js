const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  const customer = await prisma.customer.findMany();
  res.data = customer;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, mobile, email, address } = req.body;
  const customer = await prisma.customer.create({
    data: {
      name,
      mobile,
      email,
      address,
    },
  });
  next({
    status: 200,
    message: `${customer.name} customer created successfully`,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const customer = await prisma.customer.findUnique({
    where: { id: Number(id) },
  });
  res.data = customer;
  next();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, mobile, email, address } = req.body;

  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const customer = await prisma.customer.update({
    where: { id: id },
    data: {
      name,
      mobile,
      email,
      address,
    },
  });
  next({ status: 200, message: `${customer.name} Updated successfully` });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const customer = await prisma.customer.delete({
    where: { id: Number(id) },
  });

  next({
    status: 200,
    message: `${customer.name} customer deleted successfully`,
  });
});

module.exports = router;
