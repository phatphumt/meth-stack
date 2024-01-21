import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { uid } from "uid";
import { connect } from "mongoose";
import { Todo, TodoType } from "./schema";
/// <reference types="@kitajs/html/htmx.d.ts" />

await connect(process.env.DATABASE_URL as string);

const BaseHTML = ({ children }: Html.PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <title>Elysia Babyyyy</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
      </head>
      {children}
    </html>
  );
};

const app = new Elysia()
  .use(html())
  .get("/todos", async () => {
    const a = await Todo.find();
    const b: TodoType[] = a;
    console.log(b);
    let c: TodoType[] = [];
    b.forEach(({ _id, completed, content, createdAt, updatedAt }) => {
      c.push({ _id, completed, content, createdAt, updatedAt });
    });
    return <TodoList todos={c} />;
  })
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body
          hx-boost="true"
          class="flex w-full h-screen flex-col justify-center items-center"
          hx-get="/todos"
          hx-trigger="load"
          hx-swap="innerHTML"
        ></body>
      </BaseHTML>
    )
  )
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
      let c: TodoType[] = [];
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
  .get("/dbtest", async () => {
    const data = new Todo({
      completed: false,
      content: "test123",
    });
    await data.save();
    return "checkout the console!!!";
  })
  .listen(8080);

type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

function TodoItem({ _id, content, completed }: TodoType) {
  return (
    <div class="flex space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${_id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-400 font-bold"
        hx-delete={`/todos/${_id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  );
}

function TodoList({ todos }: { todos: TodoType[] }) {
  console.log(todos);
  return (
    <div class="flex flex-col">
      {todos.map((e) => (
        <TodoItem {...e} />
      ))}
      <TodoForm />
      <a href="/test">to</a>
    </div>
  );
}

function TodoForm() {
  return (
    <div>
      <form
        class="flex space-x-2"
        hx-post="/todos"
        hx-swap="beforebegin"
        _="on submit wait for htmx:afterRequest then target.reset()"
      >
        <input type="text" name="content" class="border border-black" />
        <button>add</button>
        <p class="htmx-indicator">adding..</p>
      </form>
    </div>
  );
}

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
