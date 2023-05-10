const engineRouter = require("express").Router();
const { db, addCar, deleteCar, updateCar } = require("./db.js");
const state = { velocity: {}, blocked: {} };
//get all users dialogs without messages
engineRouter.patch("/", async (request, response) => {
  const { id, status } = request.query;
console.log(id, status);
  if (!id || !status || !/^(started)|(stopped)|(drive)$/.test(status)) {
    return res
      .status(400)
      .send(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
      );
  }

  if (!db.cars.find((car) => car.id === +id)) {
    return res
      .status(404)
      .send("Car with such id was not found in the garage.");
  }

  const distance = 500000;
  if (status === "drive") {
    const velocity = state.velocity[id];

    if (!velocity)
      return res
        .status(404)
        .send(
          'Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?'
        );
    if (state.blocked[id])
      return res
        .status(429)
        .send(
          "Drive already in progress. You can't run drive for the same car twice while it's not stopped."
        );

    state.blocked[id] = true;

    const x = Math.round(distance / velocity);

    if (new Date().getMilliseconds() % 3 === 0) {
      setTimeout(() => {
        delete state.velocity[id];
        delete state.blocked[id];
        response
          .header("Content-Type", "application/json")
          .status(500)
          .send("Car has been stopped suddenly. It's engine was broken down.");
      }, (Math.random() * x) ^ 0);
    } else {
      setTimeout(() => {
        delete state.velocity[id];
        delete state.blocked[id];
        response
          .header("Content-Type", "application/json")
          .status(200)
          .send(JSON.stringify({ success: true }));
      }, x);
    }
  } else {
    const x = request.query.speed ? +request.query.speed : (Math.random() * 2000) ^ 0;

    const velocity =
      status === "started" ? Math.max(50, (Math.random() * 200) ^ 0) : 0;

    if (velocity) {
      state.velocity[id] = velocity;
    } else {
      delete state.velocity[id];
      delete state.blocked[id];
    }

    setTimeout(
      () =>
        response
          .header("Content-Type", "application/json")
          .status(200)
          .send(JSON.stringify({ velocity, distance })),
      x
    );
  }
});

module.exports = engineRouter;
