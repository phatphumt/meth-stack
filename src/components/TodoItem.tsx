import { TodoType } from "../schema";

export default function TodoItem({ _id, content, completed }: TodoType) {
  return (
    <div class="flex space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/api/todos/toggle/${_id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-400 font-bold"
        hx-delete={`/api/todos/${_id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  );
}
