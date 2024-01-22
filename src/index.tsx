import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { connect } from "mongoose";
import api from "./api";
import BaseHTML from "./components/BaseHTML";
import BaseMETH from "./components/BaseMeth";
import { emit, $emit } from "./utils/emit";
/// <reference types="@kitajs/html/htmx.d.ts" />

await connect(process.env.DATABASE_URL as string);

const app = new Elysia()
  .use(html())
  .use(api)
  .get(
    "/",
    ({ html }) =>
      html(
        <BaseMETH>
          <body
            hx-boost="true"
            class="flex w-full h-screen flex-col justify-center items-center"
            hx-get="/api/todos"
            hx-trigger="load, reloaded from:*"
            hx-swap="outerHTML"
          ></body>
        </BaseMETH>
      ),
      $emit("reloaded")
    // {
    //   afterHandle(ctx) {
    //     emit(ctx, "reloaded");
    //   },
    // }
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
