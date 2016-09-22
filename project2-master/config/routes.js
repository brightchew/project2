var express = require('express')
var router = express.Router()
var db = require('../models')


//products
//find or create new
router.get('/products', function(req, res) {
	db.combiblind.findOrCreate({
	  where: {
	    model: req.body.model
	    color: req.body.color
	    type : req.body.type
	    price: req.body.price
	    imgFileLocation:req.body.imgFileLocation
	  },
	  
	}).spread(function(combiblind, created) {
	  //code here
	});
})


//update
router.put('/products/:model/:id', function(req, res) {
		db.combiblind.update({
		  model: 'Josh'
		  }, {
		  where: {
		    author: 'Brian'
		  }
}).then(function(favorite){
  // do something after update
});

module.exports = router
