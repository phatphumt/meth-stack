import { TodoType } from "../schema";
import Link from "./Link";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export function TodoList({ todos }: { todos: TodoType[] }) {
  return (
    <div class="flex flex-col">
      {todos.map((e) => (
        <TodoItem {...e} />
      ))}
      <div class="newcontent"></div>
      <TodoForm />
      <Link href="/test">test</Link>
    </div>
  );
}
