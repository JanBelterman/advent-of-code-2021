const fs = require('fs')

function binArrToStr(arr) {
    var res = ''
    for (i in arr) {
        res += arr[i].toString()
    }
    return res
}

function bin2dec(num){
    return num.split('').reverse().reduce((x, y, i) => {
        // If the digit is a 1 (0 means no value here), then its to be added to the total
        // 111(1)   means 1
        // 11(1)1   means 2 (total 3)
        // 1(1)11   means 2^2=4 (total 7)
        // (1)111   means 2^3=8 (total 15)
        return (y === '1') ? x + Math.pow(2, i) : x;
    }, 0);
}
// console.log(`Anything to the power of 0 is always 1: 2^0=${Math.pow(2, 0)}`)

fs.readFile('day3.txt', 'utf-8', function(err, data) {
    data = data.split('\n')
    var length = data[0].length - 1

    var gammaArr = []
    for (var i = 0; i < length; i++) {
        var balance = 0 // >0 means mcb = 1, whereas <0 means mcb = 0
        for (j in data) {
            parseInt(data[j][i]) === 1
                ? balance++
                : balance--
        }
        gammaArr.push(balance > 0 ? 1 : 0)
    }
    var epsilonArr = gammaArr.map(e => e === 1? 0:1)

    var gammaStr = binArrToStr(gammaArr)
    var epsilonStr = binArrToStr(epsilonArr)
    // var gamma = parseInt(gammaStr, 2)
    var gamma = bin2dec(gammaStr)
    // var epsilon = parseInt(epsilonStr, 2)
    var epsilon = bin2dec(epsilonStr)

    console.log(`Gamma: ${gamma} (bin: ${gammaStr})`)
    console.log(`Epsilon: ${epsilon} (bin: ${epsilonStr})`)
    console.log(`Result: ${gamma * epsilon}`)
})
