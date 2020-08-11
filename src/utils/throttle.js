export default function throttle(fn, delay) {
    let previous = 0;
    return function() {
        const _this = this;
        const args = arguments;
        const now = new Date();
        if(now - previous > delay) {
            fn.apply(_this, args);
            previous = now;
        }
    }
}
