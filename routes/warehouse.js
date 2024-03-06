const { Router } = require("express");
const prisma = require("../services/prisma");
const { BadRequestError } = require("../errors/errors");

const router = Router();

router.get("/", async (req, res, next) => {
  const warehouse = await prisma.warehouse.findMany();
  res.data = warehouse;
  next();
});

router.post("/", async (req, res, next) => {
  const { name, location } = req.body;
  const warehouse = await prisma.warehouse.create({
    data: {
      name,
      location,
    },
  });
  next({
    status: 200,
    message: `${warehouse.name} warehouse created successfully`,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const warehouse = await prisma.warehouse.findUnique({
    where: { id: Number(id) },
  });
  res.data = warehouse;
  next();
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );
  const warehouse = await prisma.warehouse.update({
    where: { id: id },
    data: {
      name,
      location,
    },
  });
  next({ status: 200, message: `${warehouse.name} Updated successfully` });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id)
    throw new BadRequestError(
      "This request cannot be processed without a valid ID."
    );

  const warehouse = await prisma.warehouse.delete({
    where: { id: Number(id) },
  });

  next({
    status: "200",
    message: `${warehouse.name} warehouse deleted successfully`,
  });
});
