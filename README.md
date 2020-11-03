# Calendar-schema v1.0.11
# Installation
```
npm i --save calendar-schema
```
# Parameters
```
calendarSchema(month, year, config)
```

### arguments
 Parameter  | description | type | is required |
| ------------- | ------------- | --------------------- | ---------- |
| month  | month number in range `0 - 11`  | string, number| required |
| year | current year | string, number | required |
| config | calendar config | object | optional |

### config
 Parameter | description | type | is required |
| -----------------------| -------------| ------------| ---------- |
| startFromMonday  | if `true` then week begins from Monday  | boolean | optional |
| chunked | if `true` then returns chunked calendar schema into weeks | boolean | optional |
| chunkDaysCount | number calendar' days chunks | number | optional |

## Example
``````
import calendarSchema from 'calendar-schema';

const month = 4; // 0 - 11 range of months
const year = 2021;
const cofig = { chunked: true };

const daysSchemaForCalendar = calendarSchema(month, year, cofig);

console.log(daysSchemaForCalendar); // =>
 
//   [ { day: 25, month: 3, year: 2021, order: 0, weekDay: 0 },
//     { day: 26, month: 3, year: 2021, order: 1, weekDay: 1 },
//     { day: 27, month: 3, year: 2021, order: 2, weekDay: 2 }, // week 1
//     { day: 28, month: 3, year: 2021, order: 3, weekDay: 3 },
//     { day: 29, month: 3, year: 2021, order: 4, weekDay: 4 },
//     { day: 30, month: 3, year: 2021, order: 5, weekDay: 5 },
//     { day: 1, month: 4, year: 2021, order: 6, weekDay: 6 } ],
//   [ { day: 2, month: 4, year: 2021, order: 7, weekDay: 0 },
//     { day: 3, month: 4, year: 2021, order: 8, weekDay: 1 },
//     { day: 4, month: 4, year: 2021, order: 9, weekDay: 2 },  // week 2
//     { day: 5, month: 4, year: 2021, order: 10, weekDay: 3 },
//     { day: 6, month: 4, year: 2021, order: 11, weekDay: 4 },
//     { day: 7, month: 4, year: 2021, order: 12, weekDay: 5 },
//     { day: 8, month: 4, year: 2021, order: 13, weekDay: 6 } ],
//   [ { day: 9, month: 4, year: 2021, order: 14, weekDay: 0 },
//     { day: 10, month: 4, year: 2021, order: 15, weekDay: 1 },
//     { day: 11, month: 4, year: 2021, order: 16, weekDay: 2 },
//     { day: 12, month: 4, year: 2021, order: 17, weekDay: 3 },
//     { day: 13, month: 4, year: 2021, order: 18, weekDay: 4 },
//     { day: 14, month: 4, year: 2021, order: 19, weekDay: 5 },
//     { day: 15, month: 4, year: 2021, order: 20, weekDay: 6 } ],
//   [ { day: 16, month: 4, year: 2021, order: 21, weekDay: 0 },
//     { day: 17, month: 4, year: 2021, order: 22, weekDay: 1 },
//     { day: 18, month: 4, year: 2021, order: 23, weekDay: 2 },
//     { day: 19, month: 4, year: 2021, order: 24, weekDay: 3 },
//     { day: 20, month: 4, year: 2021, order: 25, weekDay: 4 },
//     { day: 21, month: 4, year: 2021, order: 26, weekDay: 5 },
//     { day: 22, month: 4, year: 2021, order: 27, weekDay: 6 } ],
//   [ { day: 23, month: 4, year: 2021, order: 28, weekDay: 0 },
//     { day: 24, month: 4, year: 2021, order: 29, weekDay: 1 },
//     { day: 25, month: 4, year: 2021, order: 30, weekDay: 2 },
//     { day: 26, month: 4, year: 2021, order: 31, weekDay: 3 },
//     { day: 27, month: 4, year: 2021, order: 32, weekDay: 4 },
//     { day: 28, month: 4, year: 2021, order: 33, weekDay: 5 },
//     { day: 29, month: 4, year: 2021, order: 34, weekDay: 6 } ],
//   [ { day: 30, month: 4, year: 2021, order: 35, weekDay: 0 },
//     { day: 31, month: 4, year: 2021, order: 36, weekDay: 1 },
//     { day: 0, month: 5, year: 2021, order: 37, weekDay: 2 },
//     { day: 1, month: 5, year: 2021, order: 38, weekDay: 3 },
//     { day: 2, month: 5, year: 2021, order: 39, weekDay: 4 },
//     { day: 3, month: 5, year: 2021, order: 40, weekDay: 5 },
//     { day: 4, month: 5, year: 2021, order: 41, weekDay: 6 } ] ]
``````