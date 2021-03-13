import { Router } from "express";
import CommentController from "./comment.controllers.js";

const router = Router();

router.post("/", CommentController.addComment);
router.get("/", CommentController.getComments);
router.delete(
  "/:commentId",
  CommentController.authorize,
  CommentController.removeComment
);

export default router;
