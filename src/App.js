import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Loader from './screens/Common/Loader/Loader';
import FamilyList from './components/Family/FamilyList';
import MembersList from './components/Members/MembersList';
import NotFound from './components/Common/NotFound';

const App = () => {
  return (
    <Loader>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/families-list" component={FamilyList} exact />
            <Route path="/families-list/:id/members" component={MembersList} exact />
            <Redirect from="" to="/families-list" />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    </Loader>
  );
};

export default App;