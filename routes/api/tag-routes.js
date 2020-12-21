const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags /api/tags
router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
      },
     ]
  })
   .then(dbTagData => res.json(dbTagData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

// GET single tag /api/tags/2
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
      },
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// POST tag api/tags
router.post('/', (req, res) => {
  // expects {tag_name: "Yellow"}
  Tag.create(
    req.body
  )
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// UPDATE tag api/tags/2
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, 
    {
    where: {
      id: req.params.id,
    },
    }
  )
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({ message: "No Tag found with that ID "});
      return;
    }
    res.json(dbTagData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE tag api/tags/2
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with that ID '});
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
