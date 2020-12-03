const fs = require('fs')
//PART 1
fs.readFile('day3.txt', (err, data) => {
    let dataString = data.toString();
    //Part1
    console.log(findTrees(dataString, 3, 1));
    //Part2
    let resultsArr = [];
    resultsArr.push(findTrees(dataString, 1, 1));
    resultsArr.push(findTrees(dataString, 3, 1));
    resultsArr.push(findTrees(dataString, 5, 1));
    resultsArr.push(findTrees(dataString, 7, 1));
    resultsArr.push(findTrees(dataString, 1, 2));
    console.log(resultsArr.reduce((a, b) => a * b));
})

const findTrees = (input, xSlope, ySlope) => {
    //starting position
    let xPos = 0;
    let yPos = 0;
    //Init Count
    let treeCount = 0;
    //Parse given data into 2D array
    terrainArray = input.split("\n").map(function (e) {
        return e.split("");
    })

    while (yPos < terrainArray.length) {
        //Check if reached end of given terrain
        if (terrainArray[yPos][xPos] == undefined) {
            //extend terrain
            for (let i = 0; i < terrainArray.length; i++) {
                terrainArray[i] = terrainArray[i].concat(terrainArray[i]);
            }
        }

        //Check if current position is tree (#)
        if (terrainArray[yPos][xPos] == '#') {
            treeCount++;
        }
        //Move postion
        yPos += ySlope;
        xPos += xSlope;
    }
    //Answer
    return treeCount;
}