## Calendar-schema v1.0.6
## Installation:
``` npm i --save calendar-schema ```
## Example:
``````
import calendarSchema from 'calendar-schema';

const month = 0; // 0 - 11 range of months
const year = 2021;
const daysSchemaForCalendar = calendarSchema(month, year);

    // output => [ { day: 28, month: 11, year: 2020, order: 0 },
    //             { day: 29, month: 11, year: 2020, order: 1 },
    //             { day: 30, month: 11, year: 2020, order: 2 },
    //             { day: 31, month: 11, year: 2020, order: 3 },
    //             { day: 1, month: 0, year: 2021, order: 5 },
    //             { day: 2, month: 0, year: 2021, order: 6 },
    //             { day: 3, month: 0, year: 2021, order: 7 },
    //             { day: 4, month: 0, year: 2021, order: 8 },
    //             { day: 5, month: 0, year: 2021, order: 9 },
    //             { day: 6, month: 0, year: 2021, order: 10 },
    //             { day: 7, month: 0, year: 2021, order: 11 },
    //             { day: 8, month: 0, year: 2021, order: 12 },
    //             { day: 9, month: 0, year: 2021, order: 13 },
    //             { day: 10, month: 0, year: 2021, order: 14 },
    //             { day: 11, month: 0, year: 2021, order: 15 },
    //             { day: 12, month: 0, year: 2021, order: 16 },
    //             { day: 13, month: 0, year: 2021, order: 17 },
    //             { day: 14, month: 0, year: 2021, order: 18 },
    //             { day: 15, month: 0, year: 2021, order: 19 },
    //             { day: 16, month: 0, year: 2021, order: 20 },
    //             { day: 17, month: 0, year: 2021, order: 21 },
    //             { day: 18, month: 0, year: 2021, order: 22 },
    //             { day: 19, month: 0, year: 2021, order: 23 },
    //             { day: 20, month: 0, year: 2021, order: 24 },
    //             { day: 21, month: 0, year: 2021, order: 25 },
    //             { day: 22, month: 0, year: 2021, order: 26 },
    //             { day: 23, month: 0, year: 2021, order: 27 },
    //             { day: 24, month: 0, year: 2021, order: 28 },
    //             { day: 25, month: 0, year: 2021, order: 29 },
    //             { day: 26, month: 0, year: 2021, order: 30 },
    //             { day: 27, month: 0, year: 2021, order: 31 },
    //             { day: 28, month: 0, year: 2021, order: 32 },
    //             { day: 29, month: 0, year: 2021, order: 33 },
    //             { day: 30, month: 0, year: 2021, order: 34 },
    //             { day: 31, month: 0, year: 2021, order: 35 } ]
``````
