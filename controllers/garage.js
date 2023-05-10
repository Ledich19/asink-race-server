const garageRouter = require("express").Router();
const { db, addCar, deleteCar, updateCar } = require("../models/db.js");

function generateId(existingIds) {
  let id;
  do {
    id = Math.floor(Math.random() * 100000);
  } while (existingIds.includes(id));
  return id;
}

garageRouter.get("/", async (request, response) => {
  const { _limit, _page } = request.query;
  const startIndex = (_page - 1) * _limit;
  const selectedComponents = db.cars.slice(startIndex, startIndex + _limit);
  response.setHeader("X-Total-Count", db.cars.length);
  response.json(selectedComponents);
});
garageRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const car = db.cars.find((e) => e.id === parseInt(id));
  if (car) {
    response.json(car);
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
garageRouter.post("/", async (request, response) => {
  const id = generateId(db.cars.map((car) => car.id));
  const newCar = { ...request.body, id };
  addCar(newCar);
  response.status(201).json(newCar);
});
garageRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const length = db.cars.length;
  deleteCar(id);

  if (length !== db.cars.length) {
    response.status(200).json({});
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
garageRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const carById = db.cars.find((car) => car.id === parseInt(id));
  const updatedCar = Object.assign({}, carById, request.body);
  if (updatedCar) {
    updateCar(id, updatedCar);
    response.status(200).json(db.cars.find((car) => car.id === parseInt(id)));
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});

module.exports = garageRouter;
