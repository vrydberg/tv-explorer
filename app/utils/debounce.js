export const debounce = (cb, delay) => {
    let timeout;
    return (...args) => {
        // When keystroke event occurs, reset the timer
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}
