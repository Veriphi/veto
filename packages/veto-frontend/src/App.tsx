import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'

const App = () => (
  <Router data-testid="Router">
    <RouterPage path="/" pageComponent={<Welcome />} />
    <RouterPage path="/dashboard" pageComponent={<Dashboard />} />
  </Router>
)

const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent

export default App
