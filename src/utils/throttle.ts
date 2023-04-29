export const throttle = (fn: () => void, delay: number | undefined)=> {
    let isThtottle = true
    return () => {
        if (!isThtottle) return
        isThtottle = false
        setTimeout(() => {
            fn()
            isThtottle = true
        }, delay)
    }
};