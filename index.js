const MONTH_YEAR_ERROR_MESSAGE = 'Incorrect month ot year';
const SMALL_CALENDAR_DAYS_COUNT = 35;
const LARGE_CALENDAR_DAYS_COUNT = 42;
const NOT_CHUNKED_CALENDAR_SIZE = 1;
const CHUNKED_CALENDAR_SIZE = 7;
const DEFAULT_SHOULD_START_FROM_MONDAY = false;

function getFirstDayInMonth(year, month) {
    return new Date(year, month).getDay();
}

function getChunkSize(config ) {
    let chunkDaysCount;

    if (config.chunked) {
        chunkDaysCount = config.chunkDaysCount || CHUNKED_CALENDAR_SIZE;
    } else if (config.chunkDaysCount) {
        chunkDaysCount = config.chunkDaysCount;
    } else {
        chunkDaysCount = NOT_CHUNKED_CALENDAR_SIZE;
    }

    return chunkDaysCount;
}

function getCalendarDaysWithWeekDays(calendarDays) {
    return calendarDays.reduce((result, item, index) => {
        if (index === 0 || result[index - 1].weekDay === 6) {
            result[index].weekDay = 0;
        } else {
            result[index].weekDay = result[index - 1].weekDay + 1
        }

        return result;
    }, calendarDays);
}

function validateArguments(currentMonth, currentYear) {
    if (typeof currentMonth !== 'number' || typeof currentYear !== 'number') {
        return new Error(MONTH_YEAR_ERROR_MESSAGE);
    }
}

function getDaysInMonth(iMonth, iYear) {
    const day = new Date(iYear, iMonth, 32).getDate();
    return 32 - day;
}

function chunk (array, size = 1){
    let arrayChunks = [];
    for (let i = 0; i < array.length; i+=size ){
        let arrayChunk = array.slice(i, i+size);
        arrayChunks.push(arrayChunk);
    }

    return arrayChunks
}

function getPreviousMonthDays(currentMonth, currentYear, startFromMonday) {
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthNumber = currentMonth === 0 ? 11 : currentMonth - 1;
    const firstDayInMonth = getFirstDayInMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(prevMonthNumber, currentYear);
    let prevMonthDaysLeft

    if (startFromMonday) {
        prevMonthDaysLeft = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;
    } else {
        prevMonthDaysLeft = firstDayInMonth === 0 ? 0 : firstDayInMonth;
    }

    return new Array(prevMonthDaysLeft)
        .fill(null)
        .reduce((result, item, index) => {
            const prevMonthExtraDays = prevMonthDays + 1;
            const day = prevMonthExtraDays - (prevMonthDaysLeft - index);

            result.push({
                day,
                month: prevMonthNumber,
                year: year,
                order: index,
            });
            return result;
        }, []);
}

function getCurrentMonthDays(currentMonth, currentYear, calendarDays) {
    const currentMonthDays = getDaysInMonth(currentMonth, currentYear);

    return new Array(currentMonthDays)
        .fill(null)
        .reduce((result, item, index) => {
            const day = index + 1;
            const order = calendarDays.length + index;

            result.push({
                day,
                month: currentMonth,
                year: currentYear,
                order,
            });
            return result;
        }, []);
}

function getNextMonthDays(currentMonth, currentYear, calendarDays) {
    const year = currentMonth === 11 ? currentYear + 1 : currentYear;
    const maxCalendarDays =
        calendarDays.length > SMALL_CALENDAR_DAYS_COUNT
            ? LARGE_CALENDAR_DAYS_COUNT - calendarDays.length
            : SMALL_CALENDAR_DAYS_COUNT - calendarDays.length;

    return new Array(maxCalendarDays)
        .fill(null)
        .reduce((result, item, index) => {
            const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            const day = index;
            const order = calendarDays.length + index;

            result.push({ day, month: newMonth, year, order });
            return result;
        }, []);
}

function getNormalizedArgs(currentMonth, currentYear, config = {}) {
    const chunkDaysCount = getChunkSize(config);

    return {
        normalizedCurrentMonth: +currentMonth,
        normalizedCurrentYear: +currentYear,
        config: {
            chunkDaysCount,
            startFromMonday: config.startFromMonday || DEFAULT_SHOULD_START_FROM_MONDAY,
        }
    };
}

function calendarSchema(currentMonth, currentYear, config) {
    validateArguments(currentMonth, currentYear);

    const {
        normalizedCurrentMonth,
        normalizedCurrentYear,
        config: {
            chunkDaysCount,
            startFromMonday,
        }
    } = getNormalizedArgs(
        currentMonth,
        currentYear,
        config
    );

    const calendarDays = [];
    calendarDays.push(
        ...getPreviousMonthDays(normalizedCurrentMonth, normalizedCurrentYear, startFromMonday)
    );
    calendarDays.push(
        ...getCurrentMonthDays(
            normalizedCurrentMonth,
            normalizedCurrentYear,
            calendarDays
        )
    );
    calendarDays.push(
        ...getNextMonthDays(
            normalizedCurrentMonth,
            normalizedCurrentYear,
            calendarDays
        )
    );

    const sortedCalendarDays = calendarDays.sort((a, b) => (a.order > b.order ? 1 : -1));
    const calendarDaysWithWeekDay = getCalendarDaysWithWeekDays(sortedCalendarDays);
    return chunk(calendarDaysWithWeekDay, chunkDaysCount);
}

module.exports = calendarSchema;
