const fs = require('fs');
let data = fs.readFileSync('./day8.txt', 'utf-8');
function parse(line) {
    let instruction = line.split(" ");
    instruction[1] = instruction[1].replace('+', '')
    return instruction;
}

//PART1
let instructionsArr = data.split("\n");
let accu = 0;
let visitedObj = {};
for (let i = 0; i < instructionsArr.length; i++) {
    let instruction = parse(instructionsArr[i])
    switch (instruction[0]) {
        case "acc":
            accu = accu + parseInt(instruction[1])
            break;
        case "jmp":
            i = i + parseInt(instruction[1]) - 1;
            break;
        default:
            break;
    }
    if (visitedObj[i]) {
        console.log("Part1: "+ accu);
        break;
    } else {
        visitedObj[i] = true;;
    }
}

//Part2
instructionsArr = data.split("\n").map((line) => parse(line));

for (let i = 0; i < instructionsArr.length; i++) {

    let dup = instructionsArr.map((x) => x.map((y) => y)); //copy arr and seperate values
    //swap
    if (instructionsArr[i][0] == "nop") {
        dup[i][0] = "jmp";
    } else if (instructionsArr[i][0] == "jmp") {
        dup[i][0] = "nop";
    }
    let indx = 0;
    let acc = 0;
    let visitedObj = {};
    while (dup[indx] && !visitedObj[indx]) { //has length and not visited
        visitedObj[indx] = true;
        let [instruction, amount] = dup[indx];
        if (instruction == "acc") {
            acc += parseInt(amount);
        } else if (instruction == "jmp") {
            indx += parseInt(amount) - 1;
        }
        indx += 1;
    }
    if (indx >= dup.length) //reached end
        console.log("Part2: "+ acc);
}