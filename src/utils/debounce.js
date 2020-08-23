export default function debounce(fn, delay) {
    let timeId;
    return function () {
        const _this = this;
        const args = arguments;
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
}
