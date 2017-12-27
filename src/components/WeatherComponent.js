import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './WeatherComponent.css';
import DateUtils from './../utils/DateUtils';

const propTypes = {
    data: PropTypes.object,
    dt_txt: PropTypes.string,
    id: PropTypes.number,
    showLink: PropTypes.bool,
};

const WeatherComponent = (props) => {
    const icon = props.data.weather[0].icon;
    const { temp_min, temp_max } = props.data.main;
    const { date, time } = DateUtils.formatDate(props.data.dt_txt);

    const imageUrl = `http://openweathermap.org/img/w/${icon}.png`;

    return (
        <div>
            <article className="weather-thumbnail">
                <h5>{date}</h5>
                <h5>{time}</h5>
                <img alt='Weather icon' src={imageUrl} />
                <section className="temperature-display">
                    <span>{Math.round(temp_min)}°&nbsp;</span>
                    <span>{Math.round(temp_max)}°</span>
                </section>
                {props.showLink ? <Link to={`/day/${props.id + 1}`}>Get More Info</Link> : null}
            </article>
        </div>
    );
};

WeatherComponent.propTypes = propTypes;

export default WeatherComponent;
