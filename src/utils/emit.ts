
// todo: typing
export const $emit = (name: string) => {
    return {
          afterHandle(ctx: any) {
            ctx.set.headers["HX-Trigger"] = name;
        },
    }
} 

export const emit = (ctx: any, name: string) => {
    ctx.set.headers["HX-Trigger"] = name;
} 
