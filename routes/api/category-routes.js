const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories api/categories 
router.get('/', (req, res) => {
  // Include associated products
  Category.findAll({
    include: [
      {
        model: Product,
      },]
  })
   .then(dbCategoryData => res.json(dbCategoryData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

// GET one category api/categories/2
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
      },
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// POST new category api/categories
router.post('/', (req, res) => {
  // create a new category
  // expects {"category_name": "Pants"}
  Category.create(
    req.body
  )
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// UPDATE category api/categories/2
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
    {
    where: {
      id: req.params.id,
    },
    }
  )
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({ message: "No Category found with that ID "});
      return;
    }
    res.json(dbCategoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE category api/categories/3
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with that ID '});
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
