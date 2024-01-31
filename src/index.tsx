import { Elysia, t } from "elysia";
import { Html, html } from "@elysiajs/html";
import { connect } from "mongoose";
import api from "./api/api";
import BaseMETH from "./utils/BaseMeth";
import { $emitHeader } from "./utils/emit";
import Link from "./utils/Link";
import pages from "./pages/middleware";
/// <reference types="@kitajs/html/htmx.d.ts" />

try {
  await connect(process.env.DATABASE_URL as string);
} catch (e) {
  throw new Error(`${e}`);
}

const port = process.env.PORT || 8080;

const app = new Elysia()
  .use(html())
  .use(api)
  .use(pages)
  .listen(port);

console.log(
  `server running at http://${app.server?.hostname}:${app.server?.port}`
);
