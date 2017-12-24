import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WeatherComponent.css';
import WeatherUtils from './../utils/WeatherUtils';

const propTypes = {
    data: PropTypes.object,
    dt_txt: PropTypes.string,
};

const WeatherComponent = (props) => {
    const icon = props.data.weather[0].icon;
    const minTemp = props.data.main.temp_min;
    const maxTemp = props.data.main.temp_max;
    const { date, time } = WeatherUtils.FormatDate(props.data.dt_txt);

    const imageUrl = `http://openweathermap.org/img/w/${icon}.png`;

    return (
        <div>
            <article className="weather-thumbnail">
                <h5>{date}</h5>
                <h5>{time}</h5>
                <img alt='Weather icon' src={imageUrl} />
                <section className="temperature-display">
                    <span>{Math.round(minTemp)}°&nbsp;</span>
                    <span>{Math.round(maxTemp)}°</span>
                </section>
                <Link to='/day/1'>Get More Info</Link>
            </article>
        </div>
    );
};

WeatherComponent.propTypes = propTypes;

export default WeatherComponent;
