import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

   let returnObj = {}
   let counter = 0

    for(const route in res.locals.schedule) {
        for(const trains in res.locals.schedule[route]) {
            res.locals.schedule[route][trains].destination = route
            returnObj[res.locals.schedule[route][trains].id] = [res.locals.schedule[route][trains]]     
      }
    }
    for(const route in res.locals.predictions) {
        for(const trains in res.locals.predictions[route]) {
            for(const schedules in returnObj) {
                  if(returnObj[schedules][0].relationships.trip.data.id === res.locals.predictions[route][trains].relationships.trip.data.id) {
                      returnObj[schedules][0].status = res.locals.predictions[route][trains].attributes.status
                  }
            }
        }   
        counter++
    }
    if(counter === Object.keys(res.locals.predictions).length) res.setHeader('Content-Type', 'application/json').setHeader('Access-Control-Allow-Origin', '*').status(200).json(returnObj)    

});



export default router;