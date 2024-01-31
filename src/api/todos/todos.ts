import Elysia from "elysia";
import todoDELETE from "./delete";
import todoGET from "./get";
import todoPOST from "./post";

const todos = new Elysia({prefix: "/todos"}).use(todoDELETE).use(todoGET).use(todoPOST)

export default todos