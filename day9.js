const fs = require('fs');
let data = fs.readFileSync('./day9.txt', 'utf-8');
let inputArr = data.split('\n')
const preambleLength = 25;

//Part1
const findPair = (arr, value) => {
    let mySet = new Set();
    for (let i = 0; i < arr.length; i++) {
        let num1 = parseInt(arr[i]);
        let temp = value - num1;
        // checking if set contains
        if (mySet.has(temp)) {
            return true;
        }
        mySet.add(num1);
    }
    return false;
}

const findSetSum = (arr, n, sum) => {
    let temp = parseInt(arr[0])
    let startIndx = 0
    for (let i = 1; i <= n; i++) {
        while (temp > sum && startIndx < i - 1) { //keeps within range and greater than sum
            temp = temp - parseInt(arr[startIndx]);
            startIndx++;
        }
        if (temp == sum) { //if equal to sum answer found
            let endIndx = i - 1;
            return [startIndx, endIndx];
        }

        // Add this element to temp 
        if (i < n) {
            temp += parseInt(arr[i]);
        }
    }
    console.log("No contigous set found");
}


for (let i = preambleLength; i < inputArr.length; i++) {
    let num = inputArr[i];
    let searchValuesArr = inputArr.slice(i - preambleLength, i);
    if (!findPair(searchValuesArr, num)) {
        //part1
        console.log(num);
        //Part2
        let [start, end] = findSetSum(inputArr, inputArr.length, num);
        let indexRangeArray = inputArr.slice(start, end + 1);
        let smallest = Math.min(...indexRangeArray);
        let largest = Math.max(...indexRangeArray);
        console.log(smallest + largest)
        break;
    }
}