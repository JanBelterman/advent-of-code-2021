const fs = require('fs')

function readInput() {
    var input = fs.readFileSync('input.txt', 'utf-8')
    input = input.split(',')
    return input
}

function parseFish(input) {
    return input.map(e => parseInt(e))
}

function simulateDay(fish) {
    let newBorn = []
    for (var i = 0; i < fish.length; i++) {
        if (fish[i] === 0) {
            newBorn.push(8)
            fish[i] = 6
        } else {
            fish[i] = fish[i] -1
        }
    }
    return newBorn
}

function simulateDays(fish, count) {
    var newBorn = []
    for (var d = 0; d < count; d++) {
        newBorn = simulateDay(fish)
        fish = fish.concat(newBorn)
    }
    return fish
}

function printFish(fish) {
    console.log(fish.join(','))
}

let input = readInput()
let fish = parseFish(input)
let final = simulateDays(fish, 80)
console.log(`Amount of fish: ${final.length}`)