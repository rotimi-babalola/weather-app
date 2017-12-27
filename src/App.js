import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './App.css';
import WeatherComponent from './components/WeatherComponent';
import AppStore from './AppStore';

@observer
class App extends Component {

  componentDidMount() {
    // get location from browser
    AppStore.getCurrentPostion();
  }

  render() {
    if (AppStore.isLoading) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div className="App">
        <h1>Open Weather React project</h1>
        <section className="weather">
          {
            AppStore.getSummarizedWeatherData.map((data, index) => {
              return <WeatherComponent 
                        data={data} 
                        key={index} 
                        id={index} 
                        showLink={true} />;
            })
          }
        </section>
      </div>
    );
  }
}

export default App;
