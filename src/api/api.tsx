import { $ } from "bun";
import Elysia from "elysia";
console.clear();

const resp = (await $`cd ./src/api ; find . | grep "\\.tsx$"`.text())
  .split("\n")
  .filter(el => el && el !== "./api.tsx")

const api = new Elysia({ prefix: "/api" });

resp.forEach(async filepath => {
  const routeName = filepath.substring(1, filepath.lastIndexOf('/'));
  const fileName = filepath
    .substring(filepath.lastIndexOf('/'))
    .slice(1)
    .replace(/\.tsx?$/g, "");
  const module = (( await import(filepath) ).default);
  if (Array.isArray(module)) {
    switch (fileName) {
      case "get":
        //@ts-ignore
        api.use(new Elysia({prefix: routeName}).get(...module)); break;
      case "post":
        //@ts-ignore
        api.use(new Elysia({prefix: routeName}).post(...module)); break;
      case "put":
        //@ts-ignore
        api.use(new Elysia({prefix: routeName}).put(...module)); break;
      case "patch":
        //@ts-ignore
        api.use(new Elysia({prefix: routeName}).patch(...module)); break;
      case "delete":
        //@ts-ignore
        api.use(new Elysia({prefix: routeName}).delete(...module)); break;
    }
  } else {
    
    api.use(
      new Elysia({prefix: routeName}).use(module)
    );
  }
  console.log("Generated: ", routeName);
  }
);

export default api;
