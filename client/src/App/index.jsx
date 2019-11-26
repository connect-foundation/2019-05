import React from 'react';
import { Route } from 'react-router-dom';
import { home, match, team, myteam, ranking } from '../views';

const App = () => (
  <div className="App">
    <Route exact path="/" component={home} />
    <Route path="/team" component={team} />
    <Route path="/match" component={match} />
    <Route path="/myteam" component={myteam} />
    <Route path="/ranking" component={ranking} />
  </div>
);

export default App;
