const fs = require('fs')

fs.readFile('day1.txt', 'utf-8', function(err, data) {
    data = data.split('\n')
    data = data.map(x => parseInt(x))

    console.log(inputToOutput(data))
})

function inputToOutput(input) {
    var output = 0
    var prev = undefined

    for (var i = 0; i < input.length; i += 1) {
        var window = input[i] + input[i+1] + input[i+2];

        if (prev !== undefined && window > prev) {
            output += 1
        }
        prev = window
    }

    return output
}
