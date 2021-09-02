const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price'],
          through: {
            attributes: [],
          }
        }
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const searchID = req.params.id
  try {
    const tagData = await Tag.findByPk(searchID, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price'],
          through: {
            attributes: [],
          }
        }
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id, ${searchID}.` });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  /* req.body should look like this...
      {
        tag_name: "Computer"
      }
    */
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  /* req.body should look like this...
      {
        tag_name: "Computer"
      }
    */
  const searchID = req.params.id
  Tag.update(req.body, {
    where: {
      id: searchID,
    },
  })
    .then((updatedTag) => {
      res.status(200).json({ code: 200, message: `${updatedTag} Tag updated`, updatedTagID: searchID });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  // delete one product by its `id` value
  const searchID = req.params.id
  try {
    const tagData = await Tag.destroy({
      where: {
        id: searchID
      }
    });

    if (!tagData) {
      res.status(404).json({ message: `No tag found with id, ${searchID}.` });
      return;
    }

    res.status(200).json({ code: 200, message: 'Tag deleted', deletedTagID: searchID });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
