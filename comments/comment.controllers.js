import Comment from "./Comment.js";

async function getComments(req, res) {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function addComment(req, res) {
  try {
    const { body } = req;
    const newComment = await Comment.create(body);
    res.json(newComment);
    console.log("New comment", newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function removeComment(req, res) {
  console.log("req", req);
  const {
    params: { commentId },
  } = req;
  console.log("commentId", commentId);
  await Comment.findByIdAndDelete(commentId);
  res.send(`Comment was deleted`);
}

export default {
  getComments,
  addComment,
  removeComment,
};
