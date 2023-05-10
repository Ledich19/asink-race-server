const winnersRouter = require("express").Router();
const { db, addWinner, deleteWinner, updateWinner } = require("../models/db.js");
//get all users dialogs without messages
winnersRouter.get("/", async (request, response) => {
  const { _limit, _page, _sort, _order } = request.query;
  const startIndex = (_page - 1) * _limit;
  let selectedComponents = [];
  if (_sort && _order) {
    selectedComponents = db.winners.sort((winnerA, winnerB) => {
      if (_order === "ASC") {
        return winnerA[_sort] - winnerB[_sort];
      }
      if (_order === "DESC") {
        return winnerB[_sort] - winnerA[_sort];
      }
    });
  }
  selectedComponents = db.winners.slice(startIndex, startIndex + _limit);

  if (_limit) {
    response.setHeader("X-Total-Count", db.winners.length);
  }
  response.json(selectedComponents);
});
winnersRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const winner = db.winners.find((winner) => winner.id === parseInt(id));

  if (winner) {
    response.json(winner);
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
winnersRouter.post("/", async (request, response) => {
  const newWinner = { ...request.body };
  addWinner(newWinner);
  response.status(201).json(newWinner);
});
winnersRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const length = db.winners.length;
  deleteWinner(id);

  if (length !== db.winners.length) {
    response.status(200).json({});
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});
winnersRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const winnerById = db.winners.find((winner) => winner.id === parseInt(id));
  const updatedWinner = Object.assign({}, winnerById, request.body);
  if (updatedWinner) {
    updateWinner(id, updatedWinner);
    response
      .status(200)
      .json(db.winners.find((winner) => winner.id === parseInt(id)));
  } else {
    response.status(404).json({ error: "404 NOT FOUND" });
  }
});

module.exports = winnersRouter;
