/**
 * Откладывает выполнение функции, пока с прошлого вызова не пройдёт timeout
 *
 * @param {Function} fn
 * @param {number} timeout
 * @param {boolean} immediate
 * @return {Function} debounced fn
 */
export default function debounce(fn, timeout, immediate) {
    let timerId;

    return function(...args) {
        if (immediate && !timerId) {
            fn.apply(this, args);
        }

        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;

            if (!immediate) {
                fn.apply(this, args);
            }
        }, timeout);
    };
}
