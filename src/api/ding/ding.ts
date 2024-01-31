import Elysia from "elysia";
import dingGET from "./get";

const ding = new Elysia({prefix: "/ding"}).use(dingGET)

export default ding