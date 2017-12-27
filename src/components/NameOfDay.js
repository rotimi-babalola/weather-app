import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import NameOfDayStore from './NameOfDayStore';
import WeatherComponent from '../components/WeatherComponent';

const propTypes = {
    store: PropTypes.object,
    match: PropTypes.object,
};

@observer
class NameOfDay extends Component {

    constructor() {
        super();
        this.nameOfDayStore = new NameOfDayStore();
    }

    componentDidMount() {
        // first check if we have data in the store so we know
        // whether or not to make a new api call
        if (!this.props.store.weatherData) {
            this.props.store.getCurrentPostion();
        }
    }
    render() {
        if (this.props.store.isLoading) {
            return (
                <div>Please wait...</div>
            );
        }

        /**
         * we are subtracting one because 1 is initially added to the prop id
         * in WeatherComponent.js line 30. 
         * Thinking of a less confusing way to do this 🤔
         */

        const index = parseInt(this.props.match.params.nameOfDay, 10) - 1;
        const weatherForDay = this.nameOfDayStore.getDataForMonthDay(this.props.store.weatherData, index);

        // todo we need to use the id param to get the appropriate data for each day
        return (
            <div className="App">
            <h1>Placeholder Month 2017/2018</h1>
                <section className="weather">
                    {
                        weatherForDay.map((data, index) => {
                            return <WeatherComponent
                                data={data}
                                key={index}
                                id={index}
                                showLink={false} />;
                        })
                    }
                </section>
            </div>
        );
    }
}

NameOfDay.propTypes = propTypes;


export default NameOfDay;
