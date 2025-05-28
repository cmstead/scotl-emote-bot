const { getCurrentPacificDay } = require("../../datetime");

function nextGrandma(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    const isEvenHour = hours % 2 === 0;
    const isHalfHour = 35 - minutes === 0;
    const isBeforeHalfHour = 35 - minutes >= 0;

    if (isEvenHour && isHalfHour) {
        return `now`;
    } else if (isEvenHour && isBeforeHalfHour) {
        const remainingMinutes = 35 - minutes;

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else if (!isEvenHour && isBeforeHalfHour) {
        const remainingMinutes = 35 - minutes;

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else if (isEvenHour && !isBeforeHalfHour) {
        const remainingMinutes = 95 - minutes;

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else {
        const remainingMinutes = 95 - minutes;

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    }
}

function nextTurtle(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);
    
    const isEvenHour = hours % 2 === 0;
    const isFiftyMinuteMark = 50 - minutes === 0;
    const isBeforeFiftyMinuteMark = 50 - minutes > 0;

    if(isEvenHour && isFiftyMinuteMark) {
        return 'now';
    } else if(isEvenHour && isBeforeFiftyMinuteMark) {
        const remainingMinutes = 50 - minutes;

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`; 
    } else if(isEvenHour && !isBeforeFiftyMinuteMark) {
        const remainingMinutes = 60 - (minutes - 50);

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else if(!isEvenHour && isBeforeFiftyMinuteMark) {
        const remainingMinutes = 50 - minutes;

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`
    } else {
        const remainingMinutes = 60 - (minutes - 50);

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`
    }
}

function nextShard(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);
    
    const isEvenHour = hours % 2 === 0;
    const isFiftyMinuteMark = 50 - minutes === 0;
    const isBeforeFiftyMinuteMark = 50 - minutes > 0;

    if(isEvenHour && isFiftyMinuteMark) {
        return 'now';
    } else if(isEvenHour && isBeforeFiftyMinuteMark) {
        const remainingMinutes = 50 - minutes;

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`; 
    } else if(isEvenHour && !isBeforeFiftyMinuteMark) {
        const remainingMinutes = 60 - (minutes - 50);

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else if(!isEvenHour && isBeforeFiftyMinuteMark) {
        const remainingMinutes = 50 - minutes;

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`
    } else {
        const remainingMinutes = 60 - (minutes - 50);

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`
    }
}

function nextGeyser(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    const isEvenHour = hours % 2 === 0;

    if (isEvenHour && minutes === 5) {
        return `now`;
    } else if (isEvenHour) {
        const remainingMinutes = 65 - minutes;

        return `in 1 hour, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    } else if (!isEvenHour && minutes === 5) {
        return 'in 1 hour';
    } else {
        const remainingMinutes = 65 - minutes;

        return `in ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`;
    }
}

function nextReset(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    if(hours === 0 && minutes === 0) {
        return 'now';
    } else {
        const remainingHours = minutes !== 0 ?  23 - hours : 24 - hours;
        const remainingMinutes = 60 - minutes;

        return minutes !== 0 
            ? `in ${remainingHours} ${pluralize(remainingHours, 'hour')}, ${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`
            : `in ${remainingHours} ${pluralize(remainingHours, 'hour')}`;
    }
}

function pluralize(time, word) {
    return time === 1 ? word : `${word}s`;
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
        remainingTime.push(`${remainingDays} ${pluralize(remainingDays, 'day')}`)
    }

    if(remainingHours > 0) {
        remainingTime.push(`${remainingHours} ${pluralize(remainingHours, 'hour')}`);
    }

    if(remainingMinutes > 0) {
        remainingTime.push(`${remainingMinutes} ${pluralize(remainingMinutes, 'minute')}`);
    }

    const remainingTimeString = remainingTime.join(', ');

    return remainingTimeString !== '' ? `in ${remainingTimeString}` : 'now';
}

module.exports = {
    nextGrandma,
    nextGeyser,
    nextReset,
    nextWeeklyReset,
    nextShard,
    nextTurtle
};