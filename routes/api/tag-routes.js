const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'category_id',
          'price',
          'stock'
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
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'category_id',
          'price',
          'stock'
        ]
      }
    ]
  }).then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => res.json(data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data[0]) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }
    res.json(data);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with this ID!' });
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
