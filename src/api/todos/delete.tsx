import Elysia, { t } from "elysia";
import { Todo } from "../../schema";

const todoDELETE = new Elysia().delete(
  "/:id",
  async ({ params }) => {
    await Todo.findByIdAndDelete(params.id);
  },
  { params: t.Object({ id: t.String() }) }
)

export default todoDELETE