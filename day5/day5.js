const fs = require('fs')

function readInput() {
    var input = fs.readFileSync('day5.txt', 'utf-8')
    input = input.split('\r\n')
    return input
}

function parseLines(input) {
    let lines = []
    for (i in input) {
        var line = input[i].split(' -> ')
        let start = line[0].split(',')
        let end = line[1].split(',')
        line = {
            startX: parseInt(start[0]),// - 1,
            startY: parseInt(start[1]),// - 1,
            endX: parseInt(end[0]),// - 1,
            endY: parseInt(end[1]),// - 1,
        }
        // NOTE: filter out diagonal lines (only for game 1)
        // if (line.startX !== line.endX && line.startY !== line.endY) continue
        lines.push(line)
    }
    console.log(`Number of lines: ${lines.length}`)
    return lines
}

function createGrid(lines) {
    var minX = 0
    var maxX = 0
    var minY = 0
    var maxY = 0
    for (var i in lines) {
        let line = lines[i]
        minX = Math.min(minX, Math.min(line.startX, line.endX))
        maxX = Math.max(maxX, Math.max(line.startX, line.endX))
        minY = Math.min(minY, Math.min(line.startY, line.endY))
        maxY = Math.max(maxY, Math.max(line.startY, line.endY))
    }
    console.log(`min x: ${minX} - max x: ${maxX}`)
    console.log(`min y: ${minY} - max y: ${maxY}`)
    let grid = []
    for (var r = 0; r <= maxY; r++) {
        let row = []
        for (var c = 0; c <= maxX; c++) {
            row.push(0)
        }
        grid.push(row)
    }
    return grid
}

function simulateGrid(grid, lines) {
    for (i in lines) {
        simulateLine(grid, lines[i])
    }
}

function simulateLine(grid, line) {
    let stepX = 0
    let stepY = 0
    if (line.startX > line.endX) stepX = -1
    else if (line.startX < line.endX) stepX = 1
    if (line.startY > line.endY) stepY = -1
    else if (line.startY < line.endY) stepY = 1
    var currentX = line.startX
    var currentY = line.startY
    while(currentX !== (line.endX + stepX) || currentY !== (line.endY + stepY)) {
        // current x & y should be in sync always because:
        //  - in horizontal, vertical only one needs to step
        //  - in diagonal all steps in x and y should be the same amount
        grid[currentY][currentX] += 1
        currentX += stepX
        currentY += stepY
    }
}

function printGrid(grid) {
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            process.stdout.write(grid[r][c].toString())
        }
        process.stdout.write('\n')
    }
}

function getNrOfOverlap(grid) {
    var nrOfPointsWithOverlappingLines = 0
    for (var r = 0; r < grid.length; r++) {
        for (var c = 0; c < grid[r].length; c++) {
            if (grid[r][c] >= 2) nrOfPointsWithOverlappingLines++
        }
    }
    return nrOfPointsWithOverlappingLines
}

let input = readInput()
let lines = parseLines(input)
let grid = createGrid(lines)
simulateGrid(grid, lines)
let nrOfOverlap = getNrOfOverlap(grid)
console.log(`Number of points: ${nrOfOverlap}`)
