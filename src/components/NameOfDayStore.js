import { useStrict } from 'mobx';
import DateUtils from '../utils/DateUtils';
import _ from 'lodash';

useStrict(true);

class NameOfDayStore {
    getDataForMonthDay(weatherData, index) {
        let monthDays = [];
        
        // get all month days in data and use index to get the correct month day
        weatherData.forEach((element) => {
            monthDays.push(parseInt(DateUtils.getMonthDay(element.dt_txt), 10));
        });

        monthDays = _.uniq(monthDays);

        const monthDay = monthDays[index];
        
        const weatherDataForMonthDay = weatherData.filter((element) => {
            return parseInt(DateUtils.getMonthDay(element.dt_txt), 10) === monthDay;
        });

        return weatherDataForMonthDay;
    }
}

export default NameOfDayStore;
