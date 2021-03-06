const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      attributes: {
        exclude: ['category_id']
      },
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const searchID = req.params.id
  try {
    const productData = await Product.findByPk(searchID, {
      attributes: {
        exclude: ['category_id']
      },
      include: [
        {
          model: Category,
          attributes: ['id', 'category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });

    if (!productData) {
      res.status(404).json({ message: `No product found with id, ${searchID}.` });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
      {
      "product_name": "Digital SLR Camera",
      "price": 1000.00,
      "stock": 1,
      "tagIds": [],
      "category_id": 6
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
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

// update product
router.put('/:id', (req, res) => {
  // update product data
  const searchID = req.params.id
  Product.update(req.body, {
    where: {
      id: searchID,
    },
  })
    .then((updatedProduct) => {
      res.status(200).json({ code: 200, message: `${updatedProduct} Product updated`, updatedProductID: searchID });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  const searchID = req.params.id
  try {
    const productData = await Product.destroy({
      where: {
        id: searchID
      }
    });

    if (!productData) {
      res.status(404).json({ message: `No product found with id, ${searchID}.` });
      return;
    }

    res.status(200).json({ code: 200, message: 'Product deleted', deletedProductID: searchID });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
