const fs = require('fs')

fs.readFile('input.txt', 'utf-8', function(err, data) {
    data = data.split('\n')
    data = data.map(x => parseInt(x))

    var output = 0
    var prev = undefined

    for (i in data) {
        if (prev !== undefined && data[i] > prev) {
            output += 1
        }
        prev = data[i]
    }

    console.log(output)
})
