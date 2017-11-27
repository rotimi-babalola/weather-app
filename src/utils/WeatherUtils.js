class WeatherUtils {
    static FormatDate(dateString) {
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
}

export default WeatherUtils;
