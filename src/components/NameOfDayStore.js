import { useStrict } from 'mobx';
import DateUtils from '../utils/DateUtils';

useStrict(true);

class NameOfDayStore {
    // this method needs to be refactored
    getDataForMonthDay(weatherData, index) {
        let monthDays = [];

        // get all month days in data and use index param to get the correct month day
        weatherData.forEach((element) => {
            // if we already have that month day don't push it in the array
            if(!monthDays.includes(parseInt(DateUtils.getMonthDay(element.dt_txt)))) {
                monthDays.push(parseInt(DateUtils.getMonthDay(element.dt_txt), 10));
            }
        });

        const monthDay = monthDays[index];
        
        const weatherDataForMonthDay = weatherData.filter((element) => {
            return parseInt(DateUtils.getMonthDay(element.dt_txt), 10) === monthDay;
        });

        /**
         * I'm using the first element here because the dates
         * will all be the same it's just the times that are different
         * so it does not really matter which one I use - they should all
         * have the same date - rough need to make this better
         */

        const { date } = DateUtils.formatDate(weatherDataForMonthDay[0].dt_txt);

        return { 
            weatherDataForMonthDay,
            date,
         };
    }
}

export default NameOfDayStore;
