//part1
HashSet<Integer> set = new HashSet<Integer>();
        for (int i = 0; i < nums.length; ++i)
        {
            Integer num1 =  Integer.parseInt(nums[i]);
            int temp = 2020 - num1;

            // checking if set contains
            if (set.contains(temp)) {
                System.out.println("Target Sum: " + 2020 + " Pair: (" + num1 + ", " + temp + ") Product: "+(temp*num1) );
            }
            set.add(num1);
        }


//part2
        for (int i = 0; i < nums.length - 2; i++) {
            Integer num1 =  Integer.parseInt(nums[i]);
            HashSet<Integer> set = new HashSet<Integer>();
            int curr_sum = 2020 - num1;
            for (int j = i + 1; j < nums.length; j++)
            {
                Integer num2 =  Integer.parseInt(nums[j]);
                int nested_sum=curr_sum - num2;
                if (set.contains(nested_sum))
                {
                    System.out.println("Target Sum: " + 2020 + " Triplet: (" + num1 + ", " + num2 + "," + nested_sum+") Product: " +(num1*num2*nested_sum));
                }
                set.add(num2);
            }
        }

Advent-of-Code-Day-2.js
const fs = require('fs')
fs.readFile('day2.txt', (err, data) => {
    let part1ValidCount = 0;
    let part2ValidCount = 0;
    let inputArr = data.toString().split("\n");
    inputArr.forEach((item) => {

        //parse each given line
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
        if (passwordArr[min - 1] == letter ^ passwordArr[max - 1] == letter) {
            part2ValidCount++
        }
    })
    console.log("PART 1: " + part1ValidCount);
    console.log("PART 2: " + part2ValidCount);
})