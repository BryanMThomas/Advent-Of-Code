var fs = require("fs");


const sum = (arr) => {
    return arr.reduce((a, b) => {
        return a + b;
    }, 0);
}

function filterByCount(arr, count) {
    return [...arr].filter((a, index) =>
        arr.indexOf(a) === index &&
        [...arr].reduce((acc, b) => +(a === b) + acc, 0) === count
    );
}

fs.readFile('day6.txt', (err, data) => {
    let groupArr = data.toString().split("\n\n");
    let part1SumArray = [];
    let part2SumArray = [];
    groupArr.forEach(group => {
        //part1
        let part1Set = [];
        let groupMembers = group.split("\n");
        groupMembers.forEach(member => {
            for (let i = 0; i < member.length; i++) {
                if (!part1Set.includes(member[i])) {
                    part1Set.push(member[i]);
                }
            }
        })
        part1SumArray.push(part1Set.length)

        part2SumArray.push(filterByCount(group, groupMembers.length).length)

    })
    var part1Sum = sum(part1SumArray);
    var part2Sum = sum(part2SumArray);

    console.log(part1Sum);
    console.log(part2Sum);


})