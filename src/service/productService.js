const productRouter = require('express').Router(),
  productDB = require('../model/product');

/**
 * Creates a new Product.
 */
productRouter.post('', (req, res, next) => {
  const product = new productDB({
    id: req.body.id,
    price: req.body.price,
    img1: req.body.img1,
    img2: req.body.img2,
    productName: req.body.productName,
    brand: req.body.brand,
    discountPrice: req.body.discountPrice,
    discountLable: req.body.discountLable,
    rating: req.body.rating,
    sale: req.body.sale,
  });

  product.save();
  console.log(product);
  res.status(201).json({
    message: 'Product data added successfully',
  });
});

/**
 * Returns list of products
 */
productRouter.get('', (req, res, next) => {
  productDB.find().then((docs) => {
    res.status(200).json({
      message: 'data fetched successfully!',
      product: docs,
    });
  });
});

/**
 * Returns a product by id.
 */
productRouter.get('/:id', (req, res, next) => {
  productDB.findById(req.params.id).then((productdb) => {
    res.status(200).json({
      message: 'Id fetched successfully!',
      product: productid,
    });
  });
});

module.exports = productRouter;
