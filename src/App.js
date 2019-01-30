import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import Homepage from './containers/Homepage/Homepage';
import Prayers from './containers/Prayers/Prayers';
import Flashcards from './containers/Flashcards/Flashcards';
import * as actions from './store/actions/actions';
import Settings from './containers/Settings/Settings';

class App extends Component {

  componentDidMount(){
    this.props.loadAppData();
  }

  render() {
    return (
      <>
        <Layout>
          <Switch>
            <Route path="/flashcards" component={Flashcards} />
            <Route path="/prayers" component={Prayers} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Homepage} />
          </Switch>
        </Layout>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAppData: () => dispatch(actions.loadAppData())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
