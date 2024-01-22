var $events = {};
console.log("hello!")
var $emit = (e, bubble, data) => {
    const keys = Object.keys($events);
    if (keys.includes(e)) {
    }
    else {
        $events[e] = new CustomEvent(e, {
            bubbles: bubble,
            detail: data,
        });
    }
}