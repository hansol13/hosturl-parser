/*
  Jan 5, 2021
  Problem: Read in a file of hostnames and output a file listing out how many times each unique hostname appeared.

  I believe the format of the output file was specified as:
  hostname1 - 10
  hostname2 - 103
  hostname3 - 2

  my solution outline:
  1. read in the file, split it at every newline character so I can effectively read it line by line
  2. set up an empty map where each [key,value] pair will be [hostname, # of times hostname appears]
  3. iterate through the characters of each line until a whitespace occurs. everything before the first whitespace of each line should be the full hostname
  4. for each line/hostname, check if the hostname is already in the map. if so, increment the value. if not, then add in the key-hostname with a value of 1
  5. output the contents of the map to a file 

  some notes on my solution:
  - initally thought about trimming the file to just hostnames, sorting the hostname, and then finding the count of each 
    hostname from the sorted array but then I realized this would need 3 iterations of the whole file/array. Since maps only allow unique keys,
    it would actaully be cleaner and faster to just update the key/value pair as I iterated through the file just the one time
  - had to use readFileSync to synchronously execute the below code. initially used readFile but turns out, that's asynchronous so I'd need callbacks/promises to
    write to the file whereas whereas readFileSync is synchronous so I didn't need to use callbacks/promises
  - tested on the text that you gave me, and then another file called hostnamesLonger.txt. I just copy/pasted the initial test file several times and added in some other hostnames.
*/

/*
1. read the file, split by newlines
2. on each line, read until the first whitespace (this should be the hostname)
3. if a new hostname to the map, add it to the map. if its a hostname that already exists in the map, increment the count(value of hostname key)
*/

// nodejs import for file system operations
const fs = require('fs');

/* TEST CASE 1 */
const inputFile = './input-logs/hostnames.txt';
const outputFile = './answers/hostnames-count.txt';

/* TEST CASE 2 */
// const inputFile = './input-logs/hostnames-longer.txt';
// const outputFile = './answers/hostnames-count-longer.txt';

function readAndParseIntoMap(fileToRead){
  let outputMap = new Map();
  const content = fs.readFileSync(fileToRead, 'utf8').split('\n');
  for(let i=0; i<content.length; i++){

    // set to empty string, append characters as we iterate through the input strings
    let hostname = '';
    for(let j=0; j<content[i].length; j++){
      if(content[i][j] === ' ' || content[i][j] === undefined) {
        if(outputMap.has(hostname)){
          outputMap.set(hostname, outputMap.get(hostname)+1);
        } else {
          outputMap.set(hostname, 1);
        }
        hostname = '';
        break;
      }
      hostname += content[i][j];
    }
  }
  return outputMap;
}

// below, I store the results of the reading/parsing and begin to output into the file 'hostnames-count.txt'
const resultsMap = readAndParseIntoMap(inputFile);
const writeFile = fs.createWriteStream(outputFile);

for(let [key, value] of resultsMap){
  writeFile.write(key + ' - ' + value + '\r\n');
}

console.log("...complete");