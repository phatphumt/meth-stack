import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { connect } from "mongoose";
import api from "./api";
import BaseHTML from "./components/BaseHTML";
/// <reference types="@kitajs/html/htmx.d.ts" />

await connect(process.env.DATABASE_URL as string);

const app = new Elysia()
  .use(html())
  .use(api)
  .get("/", ({ html }) =>
    html(
      <BaseHTML>
        <body
          hx-boost="true"
          class="flex w-full h-screen flex-col justify-center items-center"
          hx-get="/api/todos"
          hx-trigger="load"
          hx-swap="outerHTML"
          hx-target=".content"
        >
          <div class="content"></div>
        </body>
      </BaseHTML>
    )
  )
  .get("/test", ({ html }) =>
    html(
      <BaseHTML>
        <body
          hx-boost="true"
          class="flex w-full h-screen flex-col justify-center items-center"
        >
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            consectetur commodi aspernatur esse, dolorem corporis impedit
            quaerat?
          </p>
          <a href="/">back</a>
        </body>
      </BaseHTML>
    )
  )
  .listen(8080);

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
