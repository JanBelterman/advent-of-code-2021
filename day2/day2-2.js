const fs = require('fs')

fs.readFile('day2.txt', 'utf-8', function(err, data) {
    data = data.split('\n')

    var horizontal = 0
    var depth = 0
    var aim = 0;

    for (i in data) {
        var input = data[i].split(' ')
        var command = input[0]
        var value = parseInt(input[1])
        switch(command) {
            case 'forward':
                horizontal += value
                depth += (aim * value)
                continue
            case 'up':
                aim -= value
                continue
            case 'down':
                aim += value
                continue
        }
    }

    console.log(`Horizontal: ${horizontal}`)
    console.log(`Depth: ${depth}`)
    console.log(`Result: ${horizontal * depth}`)
})
