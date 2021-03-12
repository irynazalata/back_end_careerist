import { Router } from "express";
import CommentController from "./comment.controllers.js";

const router = Router();

router.post("/", CommentController.addComment);
router.get("/", CommentController.getComments);

export default router;
