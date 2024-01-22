# Simple Todolist with METH stack

:fire: Blazingly fast! :fire:

(MongoDB, Elysia, TailwindCSS, HTMX)

Add a `.env` file containg the MongoDB server access
```dotenv
DATABASE_URL="<YOUR DATABASE URL HERE>"
```

To start the development server run:

```bash
bun install
bun run dev
```

## Docs

### Defining a Component
They're 2 main ways to define a component
1. JSX (React Styled) Component
2. SFC (Vue 3 Styled) Component -todo-

#### React Styled
Self explanatory
```jsx
export defualt function Component() {
  return <p>Hello, World!</p>
}
```

#### Vue 3 Styled
```vue
<script props="stuff"></script>
<template>
  <p>{stuff}</p>
</template>
```

### Customs

#### `emitHeader(ctx: Context, msg: string)`
Elysia helper function to update the returned HTMX
```jsx
  get("/", ({ html }) => (<BaseMETH hx-trigger="reload"></BaseMETH>), {afterHandle(ctx) {emitHeader(ctx, "reload")} }
```

#### `$emitHeader(msg: string)`
Elysia helper function to update the returned HTMX (Vue Styled)
```jsx
  get("/", ({ html }) => (<BaseMETH hx-trigger="reload"></BaseMETH>), $emitHeader("reload") }
```

#### `$emit(msg: string)`
Emit custom event from Alpine to HTMX/Javascript. (Commonly used for responsive server-client polling)
```jsx
<BaseMETH>
  <div x-data="{clicked: 0}">
    <p x-html="`Clicked ${clicked} times`"></p>
    <button x-on:click="clicked++; $emit('ding')">+</button>
  </div>
  <p hx-trigger="ding from:body" hx-get="/api/ding"></p>
</BaseMETH>
```

### Todo:

- ~add a router~
- add some auth stuff

Open http://localhost:8080/ with your browser to see the result.
