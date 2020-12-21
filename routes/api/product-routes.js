const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products api/products
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id','category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
   .then(dbProductData => res.json(dbProductData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

// GET one product api/products/1
router.get('/:id', (req, res) => {
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        attributes: ['id','category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }
    ]
  })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// POST create new product api/products
router.post('/', (req, res) => {
  // expects {product_name: "Basketball", price: 200.00, stock: 3, tags: [1, 2, 3, 4]}

  Product.create(
    req.body
  )
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tags.length) {
        const productTagIdArr = req.body.tags.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT update product api/products/1
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, 
    {
    where: {
      id: req.params.id,
    },
    }
  )
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tags
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DELETE product api/products/2
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No Product found with that ID '});
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
