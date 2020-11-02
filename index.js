const ERROR_MESSAGE = 'Please send correct args';
const SMALL_CALENDAR_DAYS_COUNT = 35;
const LARGE_CALENDAR_DAYS_COUNT = 42;

function getFirstDayInMonth(year, month) {
    return new Date(year, month).getDay();
}

function getDaysInMonth(iMonth, iYear) {
    const day = new Date(iYear, iMonth, 32).getDate();
    return 32 - day;
}

function getPreviousMonthDays(currentMonth, currentYear) {
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthNumber = currentMonth === 0 ? 11 : currentMonth - 1;
    const firstDayInMonth = getFirstDayInMonth(currentYear, currentMonth);
    const prevMonthDays = getDaysInMonth(prevMonthNumber, currentYear);
    const prevMonthDaysLeft = firstDayInMonth === 0 ? 6 : firstDayInMonth - 1;

    return new Array(prevMonthDaysLeft)
        .fill(null)
        .reduce((result, item, index) => {
            const prevMonthExtraDays = prevMonthDays + 1;
            const day = prevMonthExtraDays - (prevMonthDaysLeft - index);

            result.push({
                day,
                month: prevMonthNumber,
                year: year,
                order: index + 1,
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
            const order = calendarDays.length + index + 1;

            result.push({ day, month: currentMonth, year: currentYear, order });
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
            const day = index + 1;
            const order = calendarDays.length + day;

            result.push({ day, month: newMonth, year, order });
            return result;
        }, []);
}

function checkIsNotValidParams(currentMonth, currentYear) {
    return typeof currentMonth !== 'number' || typeof currentYear !== 'number';
}

function getNormalizedArgs(currentMonth, currentYear) {
    return {
        normalizedCurrentMonth: +currentMonth,
        normalizedCurrentYear: +currentYear,
    };
}

function calendarSchema(currentMonth, currentYear) {
    const { normalizedCurrentMonth, normalizedCurrentYear } = getNormalizedArgs(
        currentMonth,
        currentYear
    );
    const isNotValid = checkIsNotValidParams(
        normalizedCurrentMonth,
        normalizedCurrentYear
    );

    if (isNotValid) return ERROR_MESSAGE;

    const calendarDays = [];
    calendarDays.push(
        ...getPreviousMonthDays(normalizedCurrentMonth, normalizedCurrentYear)
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

    return calendarDays.sort((a, b) => (a.order > b.order ? 1 : -1));
}

module.exports = calendarSchema;
