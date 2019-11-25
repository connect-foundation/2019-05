import React from 'react';
import { Route } from 'react-router-dom';
import { home, match, team, myteam } from '../view';

const App = () => (
  <div className="App">
    <Route exact path="/" component={home} />
    <Route path="/team" component={team} />
    <Route path="/match" component={match} />
    <Route path="/myteam" component={myteam} />
  </div>
);

export default App;
