import { Elysia, t } from "elysia";
import { Html, html } from "@elysiajs/html";
import { connect } from "mongoose";
import api from "./api";
import BaseMETH from "./utils/BaseMeth";
import { $emitHeader } from "./utils/emit";
import Link from "./utils/Link";
/// <reference types="@kitajs/html/htmx.d.ts" />

await connect(process.env.DATABASE_URL as string);

const port = process.env.PORT || 8080;

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
    $emitHeader("reloaded")
  )
  .get("/test", ({ html }) =>
    html(
      <BaseMETH>
        <body
          hx-boost="true"
          class="flex w-full h-screen flex-col justify-center items-center"
        >
          <div x-data="{clicked: 0}">
            <p x-html="`Clicked ${clicked} times`"></p>
            <button x-on:click="clicked--; $emit('ding')">-</button>
            <button x-on:click="clicked++; $emit('ding')">+</button>
          </div>
          <p hx-trigger="ding from:body" hx-get="/api/ding"></p>
          <Link href="/">back</Link>
        </body>
      </BaseMETH>
    )
  )
  .listen(port);

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
