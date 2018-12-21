const DateTime = Date;

DateTime.prototype.currentTimestamp = () => Math.round((new Date()).getTime() / 1000);

export default DateTime;
