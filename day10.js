const fs = require('fs');
//Data Manipulation
let data = fs.readFileSync('./day10.txt', 'utf-8');
data = data.split(/\n/).map(Number).sort((a, b) => a - b)
data = data.concat(Math.max(...data) + 3)

//PART1
const jolts = data
    .reduce((diffs, num, index, all) => {
        diffs[!index ? num : num - all[index - 1]] += 1
        return diffs
    }, [0, 0, 0, 0])
console.log("Part1: " + jolts[1] * jolts[3])

//PART2
const diffs = (acc, num, i, all) => (!i ? [num] : [...acc, num - all[i - 1]])
const set = [1, 2, 4, 7]
let answer = data
    .reduce(diffs, [])
    .join('')
    .match(/1+/g)
    .reduce((a, {
        length
    }) => a * set[length - 1], 1)

console.log("Part2: " + answer)