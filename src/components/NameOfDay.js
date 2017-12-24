import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

const propTypes = {
    store: PropTypes.object,
};

@observer
class NameOfDay extends Component {
    componentDidMount() {
        // this.props.getCurrentPostion();
        this.props.store.getCurrentPostion();
        console.log(this.props, this.props.store.weatherData);
        if (this.props.store.observableMonthDayArray.length > 0) {
            console.log('I have data');
        }
    }
    render() {
        return(
            <div>Welcome to this route</div>
        );
    }
}

NameOfDay.propTypes = propTypes;


export default NameOfDay;
