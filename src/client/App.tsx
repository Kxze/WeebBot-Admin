import * as React from 'react';
import { Route } from 'react-router';
import './App.css';
import Layout from './Layout';
import { Home, Settings } from './Pages';

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/settings" component={Settings} />
      </Layout>
    );
  }
}

export default App;
