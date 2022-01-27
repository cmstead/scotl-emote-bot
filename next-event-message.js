const { getCurrentPacificDay } = require("./datetime");

function nextGrandma(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    const isEvenHour = hours % 2 === 0;
    const isHalfHour = 30 - minutes === 0;
    const isBeforeHalfHour = 30 - minutes >= 0;

    if (isEvenHour && isHalfHour) {
        return `now`;
    } else if (isEvenHour && isBeforeHalfHour) {
        return `in ${30 - minutes} minutes`;
    } else if (!isEvenHour && isBeforeHalfHour) {
        return `in 1 hour, ${30 - minutes} minutes`;
    } else if (isEvenHour && !isBeforeHalfHour) {
        return `in 1 hour, ${90 - minutes} minutes`;
    } else {
        return `in ${90 - minutes} minutes`;
    }
}

function nextGeyser(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    const isEvenHour = hours % 2 === 0;

    if (isEvenHour && minutes === 0) {
        return `now`;
    } else if (isEvenHour) {
        return `in 1 hour, ${60 - minutes} minutes`;
    } else if (!isEvenHour && minutes === 0) {
        return 'in 1 hour';
    } else {
        return `in ${60 - minutes} minutes`;
    }
}

function nextReset(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    if(hours === 0 && minutes === 0) {
        return 'now';
    } else {
        return minutes !== 0 
            ? `in ${23 - hours} hours, ${60 - minutes} minutes`
            : `in ${24 - hours} hours`;
    }
}

function nextWeeklyReset(time) {
    const currentDay = getCurrentPacificDay();
    const remainingDays = 6 - currentDay;

    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const remainingHours = 23 - hours;

    const minutes = parseInt(timeTokens[1]);
    const remainingMinutes = 60 - minutes;
    
    let remainingTime = [];

    if(remainingDays > 0) {
        remainingTime.push(`${remainingDays} days`)
    }

    if(remainingHours > 0) {
        remainingTime.push(`${remainingHours} hours`);
    }

    if(remainingMinutes > 0) {
        remainingTime.push(`${remainingMinutes} minutes`);
    }

    const remainingTimeString = remainingTime.join(', ');

    return remainingTimeString !== '' ? `in ${remainingTimeString}` : 'now';
}

module.exports = {
    nextGrandma,
    nextGeyser,
    nextReset,
    nextWeeklyReset
};