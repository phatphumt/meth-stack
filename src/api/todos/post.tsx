import Elysia, { t } from "elysia";
import TodoItem from "../../components/TodoItem";
import { Todo } from "../../schema";

const todoPOST = new Elysia().post(
  "/",
  async ({ body }) => {
    console.log;
    if (body.content.length === 0) {
      throw new Error("cant be empty bro");
    }
    const data = new Todo({
      completed: false,
      content: body.content,
    });
    const a = await data.save();
    console.log(a.content);
    return (
      <TodoItem
        {...{
          _id: a._id,
          completed: a.completed,
          content: a.content,
          createdAt: a.createdAt,
          updatedAt: a.updatedAt,
        }}
      />
    );
  },
  { body: t.Object({ content: t.String() }) }
)

export default todoPOST