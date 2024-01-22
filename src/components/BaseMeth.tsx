import { Html } from "@kitajs/html";
import { hx_emit } from "../utils/hx_emit";

export default function BaseMETH({ children }: Html.PropsWithChildren) {
    return (
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        {hx_emit()}
        <title>Elysia Babyyyy</title>
        </head>
        {children}
    </html>
    );
}
