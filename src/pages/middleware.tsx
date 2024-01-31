import { html } from "@elysiajs/html";
import Elysia from "elysia";
import Test from "./components/Test";
import Root from "./components/Root";
import { $emitHeader } from "../utils/emit";

const pages = new Elysia()
  .use(html())
  .get("/", ({ html }) => html(<Root trigger="reloaded" />), $emitHeader("reloaded"))
  .get("/test", ({ html }) => html(<Test />))

export default pages;
