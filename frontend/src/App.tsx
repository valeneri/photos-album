import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Header from './components/layout/header/header';
import EventsPage from './pages/events/events-page';

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <header className="App-header">
          <Switch>
            <Route path="/home">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
          </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
          </a>
            </Route>
            <Route path="/events"><h3>EVENTS</h3></Route>
            <Route path="/years">
              <EventsPage />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
