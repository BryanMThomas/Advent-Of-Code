const fs = require('fs');
const puzzleField = 'shiny gold';

let data = fs.readFileSync('./day7.txt', 'utf-8');
let bagRules = data.split("\n");
let allBags = parseRules(bagRules);
let matches = 0;

for (color in allBags) {
    if (checkContainingColors(allBags[color], puzzleField, {})) {
        matches++;
    }
};

console.log('Part1: ', matches);

const nestedBags = countNestedBags(puzzleField);
console.log('Part2: ', nestedBags);

function parseRules(bagRules) {
    let bagtypes = {};
    bagRules.forEach(rule => {
        //split what  contains what
        const parts = rule.split(' contain ');
        parts[1] = parts[1].replace('.', ''); //remove punctuation
        parts[0] = parts[0].replace(' bags', ''); //remove extra word

        const nestedBags = parts[1].split(', '); //parse out all bags within
        bagtypes[parts[0]] = {};
        nestedBags.forEach(bag => {
            let nestedBagCount = bag.substr(0, bag.indexOf(' ')); //find bag count
            if (nestedBagCount === 'no') nestedBagCount = 0; //check no other bag scenario
            else {
                nestedBagCount = parseInt(nestedBagCount);
                const bagType = bag.substr(bag.indexOf(' ') + 1);
                let subBagType = bagType.replace(' bags', '').replace(' bag', '');
                bagtypes[parts[0]][subBagType] = nestedBagCount;
            }
        });
    });

    return bagtypes;
}

function checkContainingColors(bags, color, matched) {
    for (nestedColor in bags) {
        if (color === nestedColor) { //final case
            return true;
        }
        if (!matched.hasOwnProperty(nestedColor) && bags.hasOwnProperty(nestedColor)) {
            matched[nestedColor] = true;
            if (checkContainingColors(allBags[nestedColor], color, matched)) { //recursion
                return true;
            }
        }

    }
}

function countNestedBags(color) {
    let bagCount = 0;
    for (nestedColor in allBags[color]) {
        if (nestedColor !== 'other') {
            bagCount += allBags[color][nestedColor];
            const nestedColorCount = allBags[color][nestedColor];
            let nestedCount = countNestedBags(nestedColor); //Recursion
            if (nestedCount > 0) {
                nestedCount = nestedCount * nestedColorCount;
                bagCount += nestedCount;
            }
        }
    }
    return bagCount;
}