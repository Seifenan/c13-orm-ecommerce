const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  }).then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: [
      'id',
      'category_name'
    ],
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price', 'stock',
          'category_id'
        ]
      }
    ]
  }).then(data => {

    if (!data) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name

  }).then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {

    if (!data[0]) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {

    if (!data) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;