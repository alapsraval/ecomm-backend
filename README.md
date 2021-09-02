# E-Commerce Back End
This is an e-commerce API using Express.js and MySQL database.

## Table of Contents
1. [Schema](#schema)
2. [Associations](#associations)
3. [Dependencies](#dependencies)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributions](#contributions)
7. [Contact](#contact)
8. [License](#license)
9. [Screenshots](#screenshots)

## Schema

Database contains the following four models -
* `Category`

  * `id`

  * `category_name`  
  
* `Product`

  * `id`

  * `product_name`

  * `price`

  * `stock`

  * `category_id`
  
* `Tag`

  * `id`
  
  * `tag_name`

* `ProductTag`

  * `id`

  * `product_id`

  * `tag_id`

## Associations

Relationships between models -

* `Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.

* `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

## Getting Started
### Dependencies
node, npm, MySQL2, Sequelize, dotenv

### Installation
```sql
DROP DATABASE IF EXISTS ecommerce_db;
CREATE DATABASE ecommerce_db;
```
`npm run seed`  
`npm install`

### Usage
`npm start`

## Contributions
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Current contributors
None 

## Contact
Checkout my [GitHub](https://github.com/alapsraval).

For additional questions, feel free to reach out to me at alapsraval@gmail.com.

## License
Copyright &copy; Alap Raval. All rights reserved.

Licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Screencast

[E-Commerce API](https://youtu.be/)
