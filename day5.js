var fs = require("fs");

fs.readFile('day5.txt', (err, data) => {
    let inputArr = data.toString().split('\n');
    let outputArr1 =[];
    var arr = [];
    for(let i = 0; i < 128; i++) {
        arr.push([...Array(8).keys()]);
    }
    console.log(arr)
    //part 1
    inputArr.forEach(input => {
        let rowMax = 127;
        let rowMin = 0;
        let seatMax = 7;
        let seatMin = 0;
        [...input].forEach(char => {
            if (char == 'F') {
                rowMax = Math.floor((rowMax - rowMin) / 2) + rowMin;
            }
            if (char == 'B') {
                rowMin = Math.ceil((rowMax - rowMin) / 2) + rowMin
            }
            if (char == 'L') {
                seatMax = Math.floor((seatMax - seatMin) / 2) + seatMin;
            }
            if (char == 'R') {
                seatMin = Math.ceil((seatMax - seatMin) / 2) + seatMin
            }
        })
        let seatId = (rowMin * 8) + seatMin;
        outputArr1.push(seatId);
        arr[rowMin][seatMin]="";
    })
    console.log(Math.max(...outputArr1))

    //part2
    console.log(arr)
    let obj = [0,1023];
    for(let i =0; i <128 ; i++){
        for(let j =0; j<8;j++){
            if(arr[i][j]!=="" ){
                let id= (i * 8) + j;
                let a = obj.includes(id+1)
               if(obj.includes(id+1) || obj.includes(id-1)){
                obj.push(id);
               }
               else{
                   console.log(id)
               }
            }
        }
    }
})