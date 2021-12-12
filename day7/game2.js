const fs = require('fs')

function readInput() {
    var input = fs.readFileSync('input.txt', 'utf-8')
    input = input.split(',')
    return input
}

function parseInput(input) {
    let positions = input.map(e => parseInt(e))
    let max = input.reduce((p, c) => p = Math.max(p, c))
    return {
        max,
        positions
    }
}

function processInput(input) {
    let max = input.max
    let positions = input.positions
    var best = -1
    var bestPos = -1;
    for (var i = 0; i <= max; i++) {
        let fuelForPosition = computePosition(i, positions)
        // console.log(`Fuel for position ${i} is ${fuelForPosition}`)
        if (best === -1) {
            best = fuelForPosition
            bestPos = i
        } else {
            best = Math.min(fuelForPosition, best)
            bestPos = best === fuelForPosition ? i : bestPos
        }
    }
    return { best, bestPos }
}

function diff(a, b) { return a > b ? a - b : b - a }

function computePosition(position, positions) {
    var total = 0
    for (var i = 0; i < positions.length; i++) {
        let df = diff(positions[i], position)
        var res = 0
        for (var j = 1; j <= df; j++) {
            res += j
        }
        total += res
    }
    return total
}

var input = readInput()
input = parseInput(input)
result = processInput(input)
console.log(`Least fuel usage at position: ${result.bestPos}, value is ${result.best}`)