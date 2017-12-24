import { observable, action, useStrict, computed } from 'mobx';
import axios from 'axios';
import WeatherConstants from './constants/WeatherConstants';
import moment from 'moment';

useStrict(true);

/* eslint no-console: 0 */

class AppStore {
    @observable latitude;
    @observable longitude;
    @observable weatherData;
    @observable isLoading = true;
    @observable observableMonthDayArray = [];

    @computed get getSummarizedWeatherData() {
        const summarizedDataArray = [];
        const monthDayArray = [];
        let currentMonthDay;
        this.weatherData.forEach((element) => {
            // get month day for weather data element
            // if we don't have any data in the array push the first one we find
            if (summarizedDataArray.length === 0) {
                summarizedDataArray.push(element);
                currentMonthDay = moment(summarizedDataArray[summarizedDataArray.length-1].dt_txt).format('D');
                monthDayArray.push(currentMonthDay);
            } else if (moment(element.dt_txt).format('D') !== currentMonthDay) {
                // push element into array if monthday of element is new
                summarizedDataArray.push(element);
                currentMonthDay = moment(summarizedDataArray[summarizedDataArray.length-1].dt_txt).format('D');
                monthDayArray.push(currentMonthDay);
            }
        });

        // set month day array to contain month days from data
        // not allowed to change state inside computed
        this.setObservableMonthDayArray(monthDayArray);
        return summarizedDataArray;
    }

    @action setObservableMonthDayArray = (data) => {
        this.observableMonthDayArray = data;
    }

    @action setLatLong = (latitude, longitude) => {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @action setWeatherData = (data) => {
        this.weatherData = data;
    }

    @action stopLoading = () => {
        this.isLoading = false;
    }

    @action getCurrentPostion() {
        navigator.geolocation.getCurrentPosition((position) => {
            // null checks for position object??
            this.setLatLong(position.coords.latitude, position.coords.longitude);
            // get weather
            this.getWeather();
        }, (error) => {
            this.setLatLong(14.6, -113.6);
            // get weather
            this.getWeather();
            console.log(error);
        });
    }

    @action getWeather() {
        const url = `${WeatherConstants.WEATHER_URL}lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${WeatherConstants.APP_ID}&cnt=40`;
        axios.get(url).then((response) => {
            this.setWeatherData(response.data.list);
            this.stopLoading();
        }).catch((error) => {
            console.log(error);
        });
    }
}

const singleton = new AppStore();
export default singleton;