//Question 1
//Check whether an input is a string or not
const is_string = (input) => {
    if (typeof(input) === 'string') {
        return true;
    } else {
        return false;
    }
};
console.log(is_string('w3resource')); // true
console.log(is_string([1, 2, 4, 0])); // false

//Question 2
const is_Blank = (input) => {
    return input.length == 0 ? true : false;
};
console.log(is_Blank('')); // true

//Question3
const string_to_array = (input) => {
    return input.split(" ");
};
console.log(string_to_array("Robin Singh")); // ["Robin", "Singh"]

//Question 4
const truncate_string = (input, startingIndex) => {
    return input.substr(input, startingIndex);
};
console.log(truncate_string("Robin Singh", 4)); // "Robi"

//Question 5
const abbrev_name = (input) => {
    const newArr = input.split(" ");
    return `${newArr[0]} ${newArr[1].charAt(0)}`;
};
console.log(abbrev_name("Robin Singh")); // "Robin S."

//Question 6
const protect_email = (input) => {
    return input.replace( /^(.{4}).+(@.+)$/, '$1...$2')
};
console.log(protect_email("robin_singh@example.com")); // "robin...@example.com"

//Question 7
const string_parametrize = (input) => {
    return input
        .split("")
        .map((e) => e.replace(" ", "-"))
        .join("");
};
console.log(string_parametrize("Robin Singh from USA"));

//Question 8
const capitalize_Words = (input) => {
    return input
        .split()
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(" ");
};
console.log(capitalize_Words("js string exercises"));

//Question 9
const capitalize = (input) => {
    return input
        .split(" ")
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join(" ");
};
console.log(capitalize("js string exercises"));

//Question 10
const swapcase = (input) => {
    return input
        .split("")
        .map((e) => {
            if (e === e.toUpperCase()) {
                return (e = e.toLowerCase());
            } else if (e === e.toLowerCase()) {
                return (e = e.toUpperCase());
            }
        })
        .join("");
};

console.log(swapcase("AaBbc"));

//Question 11
const camelize = (string) => {
    const input = string.toLowerCase();
    return input
        .split(" ")
        .map((word, index) =>
            index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
};
console.log(camelize("JavaScript Exercises"));

//Question 12
const uncamelize = (input, separator) => {
    return input
        .split("")
        .map((word) =>
            word === word.toUpperCase() ? separator + word.toLowerCase() : word
        )
        .join("");
};
console.log(uncamelize("helloWorld", "-"));

//Question 13
const repeat = (input, index) => {
    return input.repeat(index);
};
console.log(repeat("Ha!", 3)); // "Ha!Ha!Ha!"

//Question 14
const insert = (existingString, input, index) => {
    return (
        existingString.substring(0, index) + input + existingString.substring(index)
    );
};
console.log(insert("We are doing some exercises.", "JavaScript ", 18));

//Question 15
const humanize_format = (num) => {
    switch (num % 10) {
        case 1:
            return num + "st";
            break;
        case 2:
            return num + "nd";
            break;
        case 3:
            return num + "rd";
            break;
        default:
            return num + "th";
    }
};
console.log(humanize_format(301));

//Question 16
const text_truncate = (input, charLength, character) => {
    const length = character.length;
    const truncPosition = charLength - length;
    return `${input.substr(0, truncPosition)}${character}"`;
};
console.log(text_truncate("We are doing JS string exercises.", 15, "!!"));

//Question 17
const string_chop = (input, n) => {
    let start = 0;
    let parts_size = Math.floor(input.length / n);
    let newPartsArr = [];
    while (start < input.length) {
        newPartsArr.push(input.substring(start, start + parts_size));
        start += parts_size;
    }
    return newPartsArr;
};
console.log(string_chop("w3resource", 3)); // ["w3r", "eso", "urc", "e"]

//Question 18
const count = (inputString, string) => {
    const nos = [...inputString.toLowerCase().split(" ")];
    const freq = [];
    for (let i = 0; i < nos.length; i++) {
        nos[i] === string ? freq.push(string) : freq;
        i++;
    }
    return freq.length;
};
console.log(count("The quick brown fox jumps over the lazy dog", "the"));


//Question 19
const reverse_binary = (input) => {
    const inputBinary = input.toString(2).split("");
    const inputBinaryLength = inputBinary.length;
    return parseInt(inputBinary.reverse().join(""),2);
}
console.log(reverse_binary(100)); // 19


//Question 20
const formatted_string = (input, nums, part) => {
    const string = nums.toString();
    const splitString = string.split("")
    const splitStringLength = splitString.length

    const right = splitString.join("") +  input.slice(0, input.length - splitString.length)
    const left = input.slice(0, input.length - splitString.length) + splitString.join("")

    return part =='r'? right : left
}
console.log(formatted_string('0000', 123, '')); // "0123"