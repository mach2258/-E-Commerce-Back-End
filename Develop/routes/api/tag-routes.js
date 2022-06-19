const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      model: Product,
      attributes: ['id','product_name','price','stock']
    }
  })
  .then((tagData) => {
    res.json(tagData);
  })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id','product_name','price','stock']
    }
  })
  .then((tagFound) => {
    res.json(tagFound);
  })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((updateTag) => {
    res.json(updateTag);
  })
  .catch((err) => res.json(err))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((destroyedTag) => {
    res.json(destroyedTag);
  })
  .catch((err) => res.json(err))
});

module.exports = router;
