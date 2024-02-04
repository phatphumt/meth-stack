import { TodoList } from "../../components/TodoList";
import { Todo, TodoType } from "../../schema";

export default [
  "/", async () => {
    const a = await Todo.find();
    const b: TodoType[] = a;
    let c: TodoType[] = [];
    b.forEach(({ _id, completed, content, createdAt, updatedAt }) => {
      c.push({ _id, completed, content, createdAt, updatedAt });
    });
    return <TodoList todos={c} />;
  },
];
