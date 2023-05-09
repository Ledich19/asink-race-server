const garageRouter = require('express').Router()

//get all users dialogs without messages
garageRouter.get('/', async (request, response) => {
//   Query Params
// Optional:
// _page=[integer]
// _limit=[integer]
// If _limit param is passed api returns a header X-Total-Count that countains total number of records.
  // [
  //   {
  //     "name": "Tesla",
  //     "color": "#e6e6fa",
  //     "id": 1
  //   }
  // ]
// "X-Total-Count": "4"

})
garageRouter.get('/:id', async (request, response) => {
//   Code: 200 OK
// Content:
//   {
//     "name": "Tesla",
//     "color": "#e6e6fa",
//     "id": 1
//   }
// Error Response:

// Code: 404 NOT FOUND
// Content:
//   {}
})
garageRouter.post('/', async (request, response) => {
//   Data Params

//   {
//     name: string,
//     color: string
//   }
// Success Response:

// Code: 201 CREATED
// Content:
//   {
//       "name": "New Red Car",
//       "color": "#ff0000",
//       "id": 10
//   }

})
garageRouter.delete('/:id', async (request, response) => {
  // Success Response:

  // Code: 200 OK
  // Content:
  //   {}
  // Error Response:
  
  // Code: 404 NOT FOUND
  // Content:
  //   {}
})
garageRouter.put('/:id', async (request, response) => {
//   Data Params

//   {
//     name: string,
//     color: string
//   }
// Success Response:

// Code: 200 OK
// Content:
//   {
//       "name": "Car with new name",
//       "color": "#ff00ff",
//       "id": 2
//   }
// Error Response:

// Code: 404 NOT FOUND
// Content:
//   {}
})

module.exports = garageRouter
