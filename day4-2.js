const fs = require('fs')

const gridSize = 5
const digits = 2
const divider = 1
const drawnLines = 1
const numberDivider = 1
const columnLength = digits + numberDivider

function readInput() {
    var input = fs.readFileSync('day4.txt', 'utf-8')
    input = input.split('\r\n')
    return input;
}

function parseInput(input) {
    var numbersDrawn = input[0].split(',').map(e => parseInt(e))
    var grids = []
    for (var i = drawnLines; i < input.length; i += (gridSize + divider)) {
        // console.log(`slicing ${i + divider} to ${(i + divider) + gridSize}`)
        grids.push(parseGrid(input.slice(i + divider, (i + divider) + gridSize)))
    }
    return {
        numbersDrawn,
        grids
    }
}

function parseGrid(lines) {
    // console.log(lines)
    var grid = []
    for (var i = 0; i < gridSize; i++) {
        grid.push([])
        // console.log(lines[i])
        for (var j = 0; j < (gridSize * columnLength); j += columnLength) {
            let row = grid[grid.length - 1]
            let number = parseInt(lines[i][j] + lines[i][j+(digits - 1)])
            row.push({
                value: number,
                drawn: 0
            })
            // console.log('column value: ' + number)
        }
    }
    // console.log(grid)
    return grid
}

function processTurn(grids, numberDrawn) {
    // console.log(grids[0])
    for (var i = 0; i < grids.length; i++) {
        let grid = grids[i]
        for (var j = 0; j < gridSize; j++) {
            let row = grid[j]
            // console.log(row)
            for (var n = 0; n < gridSize; n++) {
                let num = row[n]
                // console.log(num)
                if (num.value === numberDrawn) {
                    num.drawn = 1
                }
            }
        }
    }
}

function isDrawnInEntirety(list) {
    for (var n = 0; n < gridSize; n++) {
        let num = list[n]
        if (!num.drawn) return false
    }
    return true
}

function checkForWin(grids) {
    let winningIdx = []
    for (var i = 0; i < grids.length; i++) {
        let grid = grids[i]
        for (var j = 0; j < gridSize; j++) {
            let row = grid[j]
            let col = grid.map(c => c[j])
            if (isDrawnInEntirety(col)) {
                console.log('Entire column found')
                winningIdx.push(i)
                continue
            }
            if (isDrawnInEntirety(row)) {
                console.log('Entire row found')
                winningIdx.push(i)
            }
        }
    }
    return winningIdx
}

function playGame(grids, numbersDrawn) {
    for (i in numbersDrawn) {
        processTurn(grids, numbersDrawn[i])
        let winningGrids = checkForWin(grids)
        for (var j in winningGrids) {
            let losing = grids[winningGrids[j]]
            grids.splice(winningGrids[j], 1)
            if (grids.length === 0) {
                return {
                    winningGrid: losing,
                    finalNumberDrawn: numbersDrawn[i]
                }
            }
        }
    }
}

function calculateScore(numbersNotDrawn, finalNumberDrawn) {
    var sum = 0
    for (i in numbersNotDrawn) {
        sum += numbersNotDrawn[i]
    }
    console.log(`Sum = ${sum}`)
    console.log(`Final number drawn = ${finalNumberDrawn}`)
    return sum * finalNumberDrawn
}

function getNumbersNotDrawn(grid) {
    let notDrawnFromGrid = []
    // console.log(grid)
    // console.log(grid[1])
    for (var j = 0; j < gridSize; j++) {
        let row = grid[j]
        for (var n = 0; n < gridSize; n++) {
            let num = row[n]
            // console.log(num)
            if (num.drawn === 0) notDrawnFromGrid.push(num.value)
        }
    }
    return notDrawnFromGrid
}

let input = readInput()
let parsed = parseInput(input)

let numbersDrawn = parsed.numbersDrawn
let grids = parsed.grids

// console.log(grids)
// console.log(numbersDrawn)

let result = playGame(grids, numbersDrawn)
let winningGrid = result.winningGrid
let finalNumberDrawn = result.finalNumberDrawn
// console.log(winningGrid)

let notDrawn = getNumbersNotDrawn(winningGrid)
let score = calculateScore(notDrawn, finalNumberDrawn)
console.log(`Score = ${score}`)
