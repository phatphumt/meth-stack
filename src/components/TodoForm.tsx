export default function TodoForm() {
  return (
    <div>
      <form
        class="flex space-x-2"
        hx-post="/api/todos"
        hx-swap="beforebegin"
        hx-target=".newcontent"
        hx-on--after-request="this.reset()"
      >
        <input type="text" name="content" class="border border-black" />
        <button>add</button>
        <p class="htmx-indicator">adding..</p>
      </form>
    </div>
  );
}
