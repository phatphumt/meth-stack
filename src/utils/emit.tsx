// todo: typing
export const $emitHeader = (name: string) => {
    return {
          afterHandle(ctx: any) {
            ctx.set.headers["HX-Trigger"] = name;
        },
    }
} 

export const emitHeader = (ctx: any, name: string) => {
    ctx.set.headers["HX-Trigger"] = name;
} 

// const events = {} as {[name: string]: CustomEvent};
// export const $emit = (e: string, bubble: boolean = true, data?: object) => {
//     const keys = Object.keys(events);
//     if (keys.includes(e)) {

//     } else {
        
//     }
// }

// Hydration at home. (real)
export function EmitInternals() {
    return <script>
        {`
        var $events = {};
        console.log("hello!")
        var $emit = (e, bubble, data) => {
            const keys = Object.keys($events);
            if (keys.includes(e)) {
                document.body.dispatchEvent($events[e], data);
            }
            else {
                $events[e] = new CustomEvent(e, {
                    bubbles: bubble,
                    detail: data,
                });
                document.body.dispatchEvent($events[e], data);
            }
            
        }
        `}
    </script>;
}