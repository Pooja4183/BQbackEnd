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
 * Updates a product based on the id supplied and the response.
 * It fetches mongo's _id from id and then updates the record.
 */
productRouter.put('/:id', (req, res, next) => {
  console.log('Updating....' + req.params.id);
  productDB.find({ id: { $eq: req.params.id } }).then((pro) => {
    fetchedproductId = pro[0]._id;
    console.log(fetchedproductId);

    const product = new productDB({
      id: req.params.id,
      price: req.body.price,
      img1: req.body.img1,
      img2: req.body.img2,
      productName: req.body.productName,
      brand: req.body.brand,
      discountPrice: req.body.discountPrice,
      discountLable: req.body.discountLable,
      rating: req.body.rating,
      sale: req.body.sale,
      _id: fetchedproductId,
    });

    console.log(product);
    let output = productDB
      .updateOne({ _id: fetchedproductId }, product)
      .then(() => {
        res.status(200).json({
          message: 'Product updated successfully',
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          error: error,
        });
      });
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
  productDB.find({ id: { $eq: req.params.id } }).then((pro) => {
    res.status(200).json({
      message: 'Id fetched successfully!',
      product: pro[0],
    });
  });
});

productRouter.delete('/:id', (req, res, next) => {
  productDB
    .deleteOne({ id: req.params.id })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Product Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = productRouter;
