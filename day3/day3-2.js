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
        return (y === '1') ? x + Math.pow(2, i) : x;
    }, 0);
}

fs.readFile('day3.txt', 'utf-8', function(err, data) {
    data = data.replace(/\r/g, '')
    data = data.split('\n')
    var length = data[0].length

    var oxygen = data
    var scrubber = data
    for (var i = 0; i < length; i++) {
        var balanceO = 0
        var balanceS = 0
        for (j in oxygen) parseInt(oxygen[j][i]) === 1 ? balanceO++ : balanceO--
        for (j in scrubber) parseInt(scrubber[j][i]) === 1 ? balanceS++ : balanceS--
        var mcbO = balanceO >= 0 ? 1 : 0
        var mcbS = balanceS >= 0 ? 1 : 0
        if (oxygen.length > 1) {
            oxygen = oxygen.filter(e => parseInt(e[i]) === mcbO)
        }
        if (scrubber.length > 1) {
            scrubber = scrubber.filter(e => parseInt(e[i]) !== mcbS)
        }
    }

    var oxygenStr = binArrToStr(oxygen)
    var scrubberStr = binArrToStr(scrubber)
    var oxy = parseInt(oxygenStr, 2)
    var scr = parseInt(scrubberStr, 2)

    console.log(`Oxygen: ${oxy} (bin: ${oxygenStr})`)
    console.log(`Scrubber: ${scr} (bin: ${scrubberStr})`)
    console.log(`Result: ${oxy * scr}`)
})
