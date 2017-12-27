import { observable, action, useStrict, computed } from 'mobx';
import axios from 'axios';
import WeatherConstants from './constants/WeatherConstants';
import DateUtils from './utils/DateUtils';

useStrict(true);

class AppStore {
    @observable latitude;
    @observable longitude;
    @observable weatherData;
    @observable isLoading = true;

    @computed get getSummarizedWeatherData() {
        const summarizedDataArray = [];
        let currentMonthDay;
        this.weatherData.forEach((element) => {
            /**
             * get month day for weather data element
             * if we don't have any data in the array push the first one we find
             * or if the month day of the current element is a new one
             */
            if (summarizedDataArray.length === 0 || DateUtils.getMonthDay(element.dt_txt) !== currentMonthDay) {
                summarizedDataArray.push(element);
                // extract month day from date string
                // note that we are extracting from the last element in summarizedDataArray
                currentMonthDay = DateUtils.getMonthDay(summarizedDataArray[summarizedDataArray.length-1].dt_txt);
            }
        });

        // set month day array to contain month days from data
        return summarizedDataArray;
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
            // @todo null checks for position object??
            this.setLatLong(position.coords.latitude, position.coords.longitude);
            // get weather
            this.getWeather();
        }, () => {
            this.setLatLong(14.6, -113.6);
            // get weather
            this.getWeather();
            // todo handle errors??
        });
    }

    @action getWeather() {
        const url = `${WeatherConstants.WEATHER_URL}lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=${WeatherConstants.APP_ID}&cnt=40`;
        axios.get(url).then((response) => {
            this.setWeatherData(response.data.list);
            this.stopLoading();
        }).catch(() => {
            // todo handle errors??
        });
    }
}

const singleton = new AppStore();
export default singleton;