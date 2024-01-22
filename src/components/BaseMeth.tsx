import { Html } from "@kitajs/html";
import { EmitInternals } from "../utils/emit";

export default function BaseMETH({ children }: Html.PropsWithChildren) {
    // if (children) x_emit(children);
    return (
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/htmx.org@1.9.10"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://unpkg.com/alpinejs" defer></script>
            <EmitInternals />
            <title>Elysia Babyyyy</title>
        </head>
        {children}
    </html>
    );
}
