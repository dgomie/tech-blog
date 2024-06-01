const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js')

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

Post.hasMany(Comment, {
    foreignKey: 'comment_id',
    onDelete: "CASCADE"
})

Comment.belongsTo(Post, {
    foreignKey: 'comment_id',
    onDelete: "CASCADE"
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  // In your Comment model file
  Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User, Post, Comment };
