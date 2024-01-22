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
  .get(
    "/",
    ({ html }) =>
      html(
        <BaseHTML>
          <body
            hx-boost="true"
            class="flex w-full h-screen flex-col justify-center items-center"
            hx-get="/api/todos"
            hx-trigger="load, asdasd from:*"
            hx-swap="outerHTML"
          ></body>
        </BaseHTML>
      ),
    {
      afterHandle({ set }) {
        set.headers["HX-Trigger"] = "asdasd";
        console.log(set.headers["HX-Trigger"]);
      },
    }
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
          <a href="/" hx-target="body">
            back
          </a>
        </body>
      </BaseHTML>
    )
  )
  .listen(8080);

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
