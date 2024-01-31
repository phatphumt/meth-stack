import Elysia, { t } from "elysia";
import { Todo } from "../../../schema";
import TodoItem from "../../../components/TodoItem";

const todoTogglePOST = new Elysia()
  .post(
    "/:id",
    async ({ params }) => {
      const todo = await Todo.findById(params.id);
      if (todo) {
        todo.completed = !todo.completed;
        await todo.save();
        return <TodoItem {...todo.toObject()} />;
      }
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

export default todoTogglePOST