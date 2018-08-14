import React from "react";
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from '../components/Home'
import Detail from '../components/Detail'

const AppRouter = () => {
  return <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path='/detail/:id' component={Detail} />
      </Switch>
    </HashRouter>
}

export default AppRouter