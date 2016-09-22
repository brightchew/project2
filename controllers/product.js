var express = require('express');
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
    db.combiblind.findAll().then(function(products) {
        res.render('product', { products: products });
    });
});

//Create New Product;
router.get('/new', isLoggedIn,function(req, res) {
    res.render('product_new');
});


router.post('/new', isLoggedIn,function(req, res) {
    var model = req.body.model;
    var color = req.body.color;
    var price = req.body.price;
    var type = req.body.type;
    var maxWidth = req.body.maxWidth;
    var imgFileLocation = req.body.imgFileLocation;

    db.combiblind.findOrCreate({
        where: {
            model: model,
            color: color
        },
        defaults: {
            price: price,
            type: type,
            maxWidth: maxWidth,
            imgFileLocation: imgFileLocation
        }
    }).spread(function(productNew, created) {
        if (created) {
            req.flash('New Product created');
            res.redirect('/product');
        }
    });
});

router.get('/:id', isLoggedIn,function(req, res) {
    db.combiblind.findById(req.params.id).then(function(product) {
        // res.render('/'+req.params.id, {product: product});
        // res.json(product)
        res.render('product_detail', { product: product });
    })

});

//edit product;
router.get("/:id/edit", isLoggedIn,function(req, res) {
    db.combiblind.findById(req.params.id).then(function(product) {
        res.render('product_edit', { product: product });
    });
});

// UPDATE (this route accept info from the HTML form)
//body means form body
//params means URL paramas 
router.post("/:id",isLoggedIn, function(req, res) {

    console.log(req.params.id)
    db.combiblind.update({
        model: req.body.model,
        color: req.body.color,
        price: req.body.price,
        type: req.body.type,
        maxWidth: req.body.maxWidth,
        imgFileLocation: req.body.imgFileLocation
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/product/' + req.params.id);
    });

});

router.post("/delete/:id", isLoggedIn,function(req, res){
    db.combiblind.destroy({
  where: { id: req.params.id }
}).then(function() {
  res.redirect('/product');
});
});


module.exports = router;
