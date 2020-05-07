import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/layout/header/header';
import AdminPage from './pages/admin/admin-page';
import EventsPage from './pages/events/events-page';


export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header siteTitle={"Souvenirs"} />
        <header className="App-header">
          <Switch>
            <Route path="/home">
              <div>
                <h1>Ceci est une page d'accueil</h1>
              </div>
            </Route>
            <Route path="/events"><h3>EVENTS</h3></Route>
            <Route path="/years">
              <EventsPage />
            </Route>
            <Route path="/adcret-semin">
              <AdminPage />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
