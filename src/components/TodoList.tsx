import { TodoType } from "../schema";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export function TodoList({ todos }: { todos: TodoType[] }) {
  console.log(todos);
  return (
    <div class="flex flex-col">
      {todos.map((e) => (
        <TodoItem {...e} />
      ))}
      <div class="newcontent"></div>
      <TodoForm />
      <a href="/test">gjkasdghaszjk</a>
    </div>
  );
}
