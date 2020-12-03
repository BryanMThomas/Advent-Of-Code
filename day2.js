const fs = require('fs')
//PART 1
fs.readFile('day2.txt', (err, data) => {
    let part1ValidCount = 0;
    let part2ValidCount = 0;
    let inputArr = data.toString().split("\n");
    inputArr.forEach((item) => {

        //parse given line
        let lineArr = item.split(" ");
        let min = parseInt(lineArr[0].substring(0, lineArr[0].indexOf("-")))
        let max = parseInt(lineArr[0].substring(lineArr[0].indexOf("-") + 1, lineArr[0].length))
        let letter = lineArr[1].substring(0, 1);
        let passwordArr = lineArr[2].split("");

        //PART 1
        //Count appearances of letter
        let letterCount = 0;
        for (let i = 0; i < passwordArr.length; i++) {
            if (passwordArr[i] == letter) {
                letterCount++;
            }
        }
        //Check if within range
        if (letterCount >= min && letterCount <= max) {
            part1ValidCount++;
        }

        //PART 2
        //XOR on position of letters
        if (passwordArr[min-1] == letter ^ passwordArr[max-1] == letter) {
            part2ValidCount++
        }
    })
    console.log("PART 1: " + part1ValidCount);
    console.log("PART 2: " + part2ValidCount);
})
