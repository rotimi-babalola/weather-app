import moment from 'moment';

class DateUtils {
    static formatDate(dateString) {
        /**
         * first split the dateString on white space
         * open weather api returns date in this format
         */
        const [date, time] = dateString.split(' ');

        return {
            date: new Date(Date.parse(date)).toDateString(),
            time,
        };
    }

    static getMonthDay(dateString) {
        return moment(dateString).format('D');
    }
}

export default DateUtils;
