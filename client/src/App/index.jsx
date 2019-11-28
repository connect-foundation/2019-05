import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { home, match, team, myteam, ranking, error } from '../views';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={home} />
      <Route path="/team/:seq" component={team} />
      <Route path="/match" component={match} />
      <Route path="/myteam/:seq" component={myteam} />
      <Route path="/ranking" component={ranking} />
      <Route component={error} />
    </Switch>
  </div>
);

export default App;
