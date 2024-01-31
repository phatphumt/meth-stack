import BaseMETH from "../../utils/BaseMeth";

export default function Root({trigger}: {trigger: string}) {
  return (
    <BaseMETH>
          <body
            hx-boost="true"
            class="flex w-full h-screen flex-col justify-center items-center"
            hx-get="/api/todos"
            hx-trigger={`load, ${trigger} from:*`}
            hx-swap="outerHTML"
          ></body>
        </BaseMETH>
  )
}