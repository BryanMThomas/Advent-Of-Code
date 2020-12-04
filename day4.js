var fs = require("fs");

const requiredFields = ['pid', 'ecl', 'hcl', 'hgt', 'eyr', 'byr', 'iyr']
const validEyeColors = ['amb', "blu", 'brn', 'gry', 'grn', 'hzl', 'oth']

fs.readFile('day4.txt', (err, data) => {
    const passportArray = data.toString().split('\n\n')
    // Part 1
    let validPassportCount = 0;
    passportArray.forEach(passport =>{
        let foundField =0;
        requiredFields.forEach(field => {
            if(passport.includes(field)){
                foundField++;
            }
        })
        if(foundField==requiredFields.length){
            validPassportCount++;
        }
    })
    console.log(validPassportCount);

    // Part 2
    const validEntries = passportArray.filter(passport => {
        const fieldsArr = passport.split(/\s/) // Regex to handle spaces and new line (whitespace)
        const validFields = fieldsArr.filter(field => {
            const [fieldName, fieldValue] = field.split(":")
            switch (fieldName) {
                case 'pid':
                    return (fieldValue.match(/^(\d{9})$/))
                case 'ecl':
                    return validEyeColors.includes(fieldValue)
                case 'hcl':
                    return fieldValue.match(/^#[0-9a-f]{6}$/i)
                case 'hgt':
                    if(fieldValue.match(/([0-9]*)(cm|in)/g)){
                        let val = parseInt(fieldValue.match(/([0-9]*)/g))
                        if(fieldValue.includes("cm")){
                            return(val>=150 && val <= 193)
                        }
                        if(fieldValue.includes("in")){
                            return(val>=59 && val <= 76)
                        }
                    }
                case 'eyr':
                    if(fieldValue.match(/\d{4}/)){
                        let val = parseInt(fieldValue)
                        return (val>=2020 && val<=2030)
                    }
                case 'byr':
                    if(fieldValue.match(/\d{4}/)){
                        let val = parseInt(fieldValue)
                        return(val>=1920 && val<=2002)
                    }
                case 'iyr':
                    if(fieldValue.match(/\d{4}/)){
                        let val = parseInt(fieldValue)
                        return(val>=2010 && val<=2020)
                    }
                default:
                    return false
            }
        })
        return validFields.length === requiredFields.length
    })
    console.log(validEntries.length);
})