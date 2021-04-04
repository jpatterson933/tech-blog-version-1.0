const User = require('./users')
const Post = require('./post')


User.hasMany(Post, {
    foreignKey: 'post_id',
});


module.exports = { 
    User, Post, 
};