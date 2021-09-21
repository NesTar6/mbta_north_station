import express from 'express';
var router = express.Router();
import fetch from 'node-fetch'

/* GET users listing. */
router.get('/', function(req, res, next) {

  let returnObj = {}

  fetch('https://api-v3.mbta.com/routes?filter[type]=2&filter[stop]=place-north')
  .then(result => {
    return result.json()
  })
  .then((result) => {
    return result.data
  })
  .catch((err) => {
    console.log(err)
    throw err
  })
  .then(result => {
    for(const train in result) {
      fetch(`https://api-v3.mbta.com/predictions?filter[route]=${result[train].id}&filter[stop]=place-north`)
      .then(response => {
        return response.json()
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
      .then(res => {
        returnObj[result[train].attributes.direction_destinations[0]] = res.data
      })
      .then(()=> {
        if(Object.keys(returnObj).length === result.length) {
          res.locals.predictions = returnObj
          next()
        }
      })
    }
  })
});


export default router;