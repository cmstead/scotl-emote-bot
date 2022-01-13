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

module.exports = {
    nextGrandma
};