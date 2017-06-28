# Project Objectives
To generate password consisting of:
- Lower case alphabets
- Upper case alphabets
- Numbers
- Special characters. (This is optional)
- Alphabets are not repeatable
- Password minimum and maximum lengths are 4/32
- Measure performance: DCL (Document content load), onload and time to generate password

## Download
To download the app, click [here]( https://adabonyan.github.io/generate-password/ )

## Major functions
`Math.floor(Math.random())` - Used to 
- Select the length of each contributor (lowercase, uppercase, number and special characters)
- Pick inputs for each contributor array
- Shuffle each contributor array
- Add each contribtor array elements to the password array
- Shuffle password array 3 times.

Delivered password as a string

## Google Analytics
Used to measure DCL and onload duration

## User Timer API
Time to run `function generatePassword()` was measured using 3 different methods. All showed same result. The notes below explain these methods.

Note that API refers to each timeStamp as startTime irrespective of the name (start, end) given to the performance mark. 
  
### Method 1
```
perfMark = window.performance.getEntriesByType('mark');
timeTogenerate = (perfMark[1].startTime - perfMark[0].startTime);
console.log(timeTogenerate);
```

Tried `console.log(perfMark);` - Observed perfMark is an object and perfMark is an (array) element of perfMark

### Method 2
```
var startGen = window.performance.getEntriesByName("mark_start_generatePassword");
var stopGen = window.performance.getEntriesByName("mark_end_generatePassword");
timeTogenerate = stopGen[0].startTime - startGen[0].startTime;
console.log(timeTogenerate);
```

### Method 3
```
window.performance.measure("measure_generatePassword", "mark_start_generatePassword", "mark_end_generatePassword");
var timeToGenerate = window.performance.getEntriesByName("measure_generatePassword");
console.log(timeToGenerate[0].duration);
```

Method 3 was applied. Note that this method gives the duration.
All performance reports appear in the footer