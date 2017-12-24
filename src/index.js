import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import AppStore from './AppStore';
import NameOfDay from './components/NameOfDay';
import NotFoundComponent from './components/NotFoundComponent';
import registerServiceWorker from './registerServiceWorker';

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route 
                    exact path="/day/:nameOfDay" 
                    render={(routeProps) => (
                        <NameOfDay {...routeProps} store={AppStore} />
                      )}
                    />
                <Route component={NotFoundComponent}/>
            </Switch>
        </BrowserRouter>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
