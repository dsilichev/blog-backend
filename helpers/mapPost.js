const mongoose = require('mongoose');
const mapComment = require("./mapComment");

module.exports = function (post) {
  return {
    id: post.id,
    title: post.title,
    imageUrl: post.image,
    content: post.content,
    comments: post.comments.map((comment) =>
      mongoose.isObjectOrHexString(comment) ? comment : mapComment(comment)
    ),
    publishedAt: post.createdAt,
  };
};
