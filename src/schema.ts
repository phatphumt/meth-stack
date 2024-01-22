import * as mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export type TodoType = mongoose.InferSchemaType<typeof todoSchema> & {
  _id: mongoose.Types.ObjectId;
};
export const Todo = mongoose.model("Todos", todoSchema);
