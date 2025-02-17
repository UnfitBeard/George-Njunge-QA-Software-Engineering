//Question 1
function isPalindrome(str) {
  const cleanedString = str.replace(/[ ,?]/g, "").toLowerCase();
  const reverseString = cleanedString.split("").reverse().join("");
  return cleanedString == reverseString;
}

//test cases
console.log(isPalindrome("A man, a plan, a canal, Panama")); //true
console.log(isPalindrome("Was it a car or a cat I saw?")); //false
console.log(isPalindrome("Hello, World!")); //false

//Question 2
const reverseString = (str) => {
  return str.split("").reverse().join("");
};
console.log(reverseString("My name is G the man"));

//Question 3
function longestPalindromicSubstring(str) {
  function expand(i, j) {
    let left = i;
    let right = j;

    while (left >= 0 && right < str.length && str[left] === str[right]) {
      left--;
      right++;
    }
    return str.slice(left + 1, right);
  }

  let ans = "";

  for (let i = 0; i < str.length; i++) {
    let odd = expand(i, i);
    if (odd.length > ans.length) {
      ans = odd;
    }

    let even = expand(i, i + 1);
    if (even.length > ans.length) {
      ans = even;
    }
  }
  return ans;
}

console.log(longestPalindromicSubstring("ababa"));

//Question 4
//Check if two strings are anagrams
function areAnagrams(str1, str2) {
  const letters = [];
  const str1LowerCase = str1.toLowerCase();
  const str2Lowercase = str2.toLowerCase();
  const strArray = str1LowerCase.split("");
  for (let i = 0; i < str1.length; i++) {
    if (str1LowerCase.includes(str2Lowercase[i])) {
      letters.push(str2[i]);
    }
  }
  return letters.length == str1.length;
}

console.log(areAnagrams("Listen", "Silent")); //true
console.log(areAnagrams("Hello", "World")); //false

//Question 5
//Removing Duplicates From a string
const removeDuplicates = (input) => {
  const strLowerCase = input.toLowerCase();
  const inputString = strLowerCase.split("");
  const output = [];

  for (let i = 0; i < input.length; i++) {
    while (!output.includes(input[i])) {
      output.push(input[i]);
    }
  }
  return output.join("");
};
console.log(removeDuplicates("programming"));
console.log(removeDuplicates("hello world"));
console.log(removeDuplicates("aaaaa"));
console.log(removeDuplicates("abcd"));
console.log(removeDuplicates("aabbcc"));

//Question 6
// JavaScript program to count all palindromic substring
// of given string by generating all possible substrings
function countPalindromes(s) {
    let palindromes = new Set(); 
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            palindromes.add(s.slice(left, right + 1));
            left--;
            right++;
        }
    }
    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);
        expandAroundCenter(i, i + 1);
    }
    return palindromes.size;
}

console.log(countPalindromes('ababa'));  // Output: 7
console.log(countPalindromes('racecar'));  // Output: 7


//Question 7
//longestCommonPrefix
const longestCommonPrefix = (inputArr) => {
  let prefixes = [];
  let str1 = inputArr[0];
  let cleanStr1 = str1.split("");
  let str2 = inputArr[1];
  let cleanStr2 = str2.split("");
  let str3 = inputArr[2];
  let cleanStr3 = str3.split("");
  const longestStringLength = Math.max(
    inputArr[0].length,
    inputArr[1].length,
    inputArr[2].length
  );

  for (let i = 0; i < longestStringLength; i++) {
    if (cleanStr1[i] === cleanStr2[i] && cleanStr1[i] === cleanStr3[i]) {
      prefixes.push(cleanStr1[i]);
    }
  }
  return prefixes.join("");
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(
  longestCommonPrefix(["interspecies", "interstellar", "interstate"])
);
console.log(longestCommonPrefix(["prefix", "prefixes", "preform"]));

//Question 8
//Case insensitive palindrome
function caseInsensitivePalindrome(str) {

    str = str.toLowerCase();
    function expand(i, j) {
      let left = i;
      let right = j;
  
      while (left >= 0 && right < str.length && str[left] === str[right]) {
        left--;
        right++;
      }
      return str.slice(left + 1, right);
    }
  
    let ans = "";
  
    for (let i = 0; i < str.length; i++) {
      let odd = expand(i, i);
      if (odd.length > ans.length) {
        ans = odd;
      }
  
      let even = expand(i, i + 1);
      if (even.length > ans.length) {
        ans = even;
      }
    }
    return ans;
  }
  
  console.log(caseInsensitivePalindrome("babad"));
  console.log(caseInsensitivePalindrome("RaceCar"));
  
