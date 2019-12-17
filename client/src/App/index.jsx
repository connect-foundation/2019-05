import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { home, match, myteam, error } from '../views';

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={home} />
      <Route exact path="/match" component={match} />
      <Route exact path="/myteam" component={myteam} />
      <Route component={error} />
    </Switch>
  </div>
);

export default App;
