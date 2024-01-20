import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { uid } from "uid";
/// <reference types="@kitajs/html/htmx.d.ts" />

const thestuff: Todo[] = [];

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
  .get("/todos", () => <TodoList todos={thestuff} />)
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body
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
    ({ params }) => {
      const todo = thestuff.find((e) => e.id === params.id);
      if (todo) {
        todo.completed = !todo.completed;
        return <TodoItem {...todo} />;
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
    ({ params }) => {
      const todo = thestuff.find((e) => e.id === params.id);
      if (todo) {
        thestuff.splice(thestuff.indexOf(todo), 1);
      }
    },
    { params: t.Object({ id: t.String() }) }
  )
  .post(
    "/todos",
    ({ body }) => {
      if (body.content.length === 0) {
        throw new Error("cant be empty bro");
      }
      const newTodo: Todo = {
        id: uid(5),
        content: body.content,
        completed: false,
      };
      thestuff.push(newTodo);
      return <TodoItem {...newTodo} />;
    },
    { body: t.Object({ content: t.String() }) }
  )
  .listen(8080);

type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

function TodoItem({ id, content, completed }: Todo) {
  return (
    <div class="flex space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-400 font-bold"
        hx-delete={`/todos/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="flex flex-col">
      {todos.map((e) => (
        <TodoItem {...e} />
      ))}
      <TodoForm />
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
      </form>
    </div>
  );
}

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
