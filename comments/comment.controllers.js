import Comment from "./Comment.js";
import jwt from "jsonwebtoken";

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
    console.log(newComment);
    const token = jwt.sign(
      {
        id: newComment._id,
      },
      process.env.JWT_SECRET
    );
    await Comment.findByIdAndUpdate(newComment._id, { token: token });
    const addedComment = await Comment.findById(newComment._id);
    res.json(addedComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function removeComment(req, res) {
  try {
    const {
      params: { commentId },
    } = req;
    await Comment.findByIdAndDelete(commentId);
    const comments = await Comment.find();
    res.send(comments);
  } catch (error) {
    res.status(400).send(error.message);
  }
}
async function authorize(req, res, next) {
  const authorizationHeader = req.get("Authorization");
  if (!authorizationHeader) {
    return res.status(401).send({
      message: "Not authorized",
    });
  }
  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    const { id } = payload;
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(401).send({
        message: "Not authorized",
      });
    }
    req.comment = comment;
    next();
  } catch (error) {
    return res.status(401).send(error);
  }
}

export default {
  getComments,
  addComment,
  removeComment,
  authorize,
};
