// Realizing the data structure used in game 1 (a flat array) wasn't going to cut it for game 2

const fs = require('fs')

function readInput() {
    var input = fs.readFileSync('input.txt', 'utf-8')
    input = input.split(',')
    return input
}

function parseFish(input) {
    return input.map(e => parseInt(e))
}

function groupFish(fish) {
    let grouped = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var f = 0; f < fish.length; f++) {
        grouped[fish[f]]++
    }
    return grouped
}

function simulateDay(grouped) {
    var hand = -1
    for (var g = 8; g >= 0; g--) {
        if (g === 0) {
            grouped[8] = hand
            grouped[6] += hand
        } else {
            let temp = grouped[g - 1]
            if (hand === -1) {
                grouped[7] = grouped[8]
            } else {
                grouped[g - 1] = hand
            }
            hand = temp
        }
    }
}

function simulateDays(grouped, count) {
    for (var d = 0; d < count; d++) {
        simulateDay(grouped)
    }
    return grouped
}

let input = readInput()
let fish = parseFish(input)
let grouped = groupFish(fish)
let final = simulateDays(grouped, 256)
console.log(`Amount of fish: ${final.reduce((t, e) => t + e)}`)