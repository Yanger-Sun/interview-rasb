import Big from "big.js";

function getPercent(num: number, getRate = true) {
    return getRate ? new Big(num).times(100).toNumber() : new Big(num).div(10000).toNumber();
}
function Debounce(func, wait, immediate) {
    let timeout
    wait = wait || 500
    immediate = immediate || true

    return function () {
        const context = this
        const args = arguments

        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            var callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(context, args);
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}
export {
    getPercent,
    Debounce
}