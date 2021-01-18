# hosturl-parser
solution to a coding challenge I was given - keeping in github beacuse this code may prove useful for any future log file analysis.

## Problem:
read in a log file and return each unique hostname and how many times it appears in the log

## Solution:
my solution was to use a map, where the key would be each hostname, and value of each key would be incremented if a hostname already exists in the map

## Usage:
built to be used with node.
1. clone/download repository to your local machine
2. edit parser.js to match the filepath of the log file you wish to read from, as well as the output file you wish to save it as
3. open a command window and navigate to the root directory
4. run 'node parser.js'
5. should now have an output file that reads as such:
hostname1 - ##
hostname2 - ##
hostname3 - ##
