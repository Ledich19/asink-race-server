const garageRouter = require("express").Router();
let cars = [
  {
    name: "Tesla",
    color: "#e6e6fa",
    id: 1,
  },
];
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
  const selectedComponents = cars.slice(startIndex, startIndex + _limit);
  response.setHeader("X-Total-Count", cars.length);
  response.json(selectedComponents);
});
garageRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const car = cars.find((e) => e.id === parseInt(id));
  if (car) {
    response.json(car);
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
garageRouter.post("/", async (request, response) => {
  const id = generateId(cars.map((car) => car.id));
  const newCar = { ...request.body, id };
  cars.push(newCar);
  response.status(201).json(newCar);
});
garageRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const length = cars.length;
  cars = cars.filter((car) => car.id !== parseInt(id));

  if (length !== cars.length) {
    response.status(200).json({});
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
garageRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const updateCar = cars.find((car) => car.id === parseInt(id));
  const updatedCar = Object.assign({}, updateCar, request.body);
  if (updatedCar) {
    cars = cars.map((car) => {
      if (car.id === parseInt(id)) {
        return updatedCar;
      }
      return car;
    });
    response.status(200).json(cars.find((car) => car.id === parseInt(id)));
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});

module.exports = garageRouter;
