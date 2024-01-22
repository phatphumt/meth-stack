import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { connect } from "mongoose";
import api from "./api";
import BaseHTML from "./components/BaseHTML";
import BaseMETH from "./components/BaseMeth";
import { $emitHeader } from "./utils/emit";
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
          <a href="/" hx-target="body">
            back
          </a>
        </body>
      </BaseMETH>
    )
  )
  .listen(3000);

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
