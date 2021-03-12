import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

CommentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
