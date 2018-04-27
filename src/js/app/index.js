import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Contact from '../pages/Contact'

const App = () => (
  <Router>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/contato' component={Contact} exact />
    </Switch>
  </Router>
)

export default App 
