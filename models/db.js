const db = {
  cars: [
    {
      name: "Tesla",
      color: "#e6e6fa",
      id: 1,
    },
  ],
  winners: [
    {
      id: 1,
      wins: 1,
      time: 10,
    },
  ],
};

const addCar = (car) => {
  db.cars = db.cars.concat(car);
};
const deleteCar = (id) => {
  db.cars = db.cars.filter((car) => car.id !== parseInt(id));
};
const updateCar = (id, updatedCar) => {
  db.cars = db.cars.map((car) => {
    if (car.id === parseInt(id)) {
      return updatedCar;
    }
    return car;
  });
};

const addWinner = (winner) => {
  db.winners = db.winners.concat(winner);
};
const deleteWinner = (id) => {
  db.winners = db.winners.filter((winner) => winner.id !== parseInt(id));
};
const updateWinner = (id, updatedWinner) => {
  db.winners = db.winners.map((winner) => {
    if (winner.id === parseInt(id)) {
      return updatedWinner;
    }
    return winner;
  });
};

module.exports = {
  db,
  addCar,
  deleteCar,
  updateCar,
  addWinner,
  deleteWinner,
  updateWinner,
};
