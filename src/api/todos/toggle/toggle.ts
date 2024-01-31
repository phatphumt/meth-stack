import Elysia from "elysia";
import todoTogglePOST from "./post";

const todosToggle = new Elysia({ prefix: "/todos/toggle" }).use(todoTogglePOST);

export default todosToggle;
