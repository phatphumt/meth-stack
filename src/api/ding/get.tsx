import Elysia from "elysia";

const dingGET = new Elysia().get("/", async () => {
  return <p>Ding! Ringed Server!</p>;
});

export default dingGET