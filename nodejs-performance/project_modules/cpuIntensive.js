const calcIt = async (i) => {
    return Math.atan(i) * Math.tan(i);
}

const powTanAtan = async (num) => {
    return await (async () => {
        let result = 0;
        for (let i = Math.pow(  num, 7); i >= 0; i--) {
            result += await calcIt(i)
        }
        return result
    })()
}

module.exports ={
    powTanAtan
}
