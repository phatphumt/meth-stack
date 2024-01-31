import BaseMETH from "../../utils/BaseMeth";
import Link from "../../utils/Link";

export default function Test() {
  return (
    <BaseMETH>
      <body
        hx-boost="true"
        class="flex w-full h-screen flex-col justify-center items-center"
      >
        <div x-data="{clicked: 0}">
          <p x-html="`Clicked ${clicked} times`"></p>
          <button x-on:click="clicked--; $emit('ding')">-</button>
          <button x-on:click="clicked++; $emit('ding')">+</button>
        </div>
        <p hx-trigger="ding from:body" hx-get="/api/ding"></p>
        <Link href="/">back</Link>
      </body>
    </BaseMETH>
  );
}
