const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const searchID = req.params.id
  try {
    const categoryData = await Category.findByPk(searchID, {
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        }
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with id, ${searchID}.` });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
      {
        category_name: "Basketball"
      }
    */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  /* req.body should look like this...
  {
    category_name: "Basketball"
  }*/
  const searchID = req.params.id
  Category.update(req.body, {
    where: {
      id: searchID,
    },
  })
    .then((updatedCategory) => {
      res.status(200).json({ code: 200, message: `${updatedCategory} Category updated`, updatedCategoryID: searchID });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const searchID = req.params.id
  try {
    const categoryData = await Category.destroy({
      where: {
        id: searchID
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: `No category found with id, ${searchID}.` });
      return;
    }

    res.status(200).json({ code: 200, message: 'Category deleted', deletedCategoryID: searchID });
  } catch (err) {
    if (err.parent.errno === 1451) err = { code: 500, message: 'Cannot delete or update a parent category. Please delete products under this category first.', categoryID: searchID };
    res.status(500).json(err);
  }
});

module.exports = router;
