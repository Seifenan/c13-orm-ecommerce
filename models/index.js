// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Categories have many Products

User.hasMany(Post, {
  foreignKey: 'user_id'
});

// Products belongToMany Tags (through ProductTag)

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

// Tags belongToMany Products (through ProductTag)

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
