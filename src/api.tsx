import { Html } from "@kitajs/html";
import Elysia, { t } from "elysia";
import { Todo, TodoType } from "./schema";
import TodoItem from "./components/TodoItem";
import { TodoList } from "./components/TodoList";

const api = new Elysia({ prefix: "/api" })
  .post(
    "/todos/toggle/:id",
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
  .delete(
    "/todos/:id",
    async ({ params }) => {
      await Todo.findByIdAndDelete(params.id);
    },
    { params: t.Object({ id: t.String() }) }
  )
  .post(
    "/todos",
    async ({ body }) => {
      console.log;
      if (body.content.length === 0) {
        throw new Error("cant be empty bro");
      }
      const data = new Todo({
        completed: false,
        content: body.content,
      });
      const a = await data.save();
      console.log(a.content);
      return (
        <TodoItem
          {...{
            _id: a._id,
            completed: a.completed,
            content: a.content,
            createdAt: a.createdAt,
            updatedAt: a.updatedAt,
          }}
        />
      );
    },
    { body: t.Object({ content: t.String() }) }
  )
  .get("/todos", async () => {
    const a = await Todo.find();
    const b: TodoType[] = a;
    let c: TodoType[] = [];
    b.forEach(({ _id, completed, content, createdAt, updatedAt }) => {
      c.push({ _id, completed, content, createdAt, updatedAt });
    });
    return <TodoList todos={c} />;
  });

export default api;