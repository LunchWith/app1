import React from 'react';
import { Route, Switch } from 'react-router';

import requireAuthentication from './utils/requireAuthentication';
import {
    HomeView,
    LoginView,
    ProtectedView,
    DetailView,
    NotFoundView,
} from './containers';


export default(
    <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/login" component={LoginView} />
        <Route path="/protected" component={requireAuthentication(ProtectedView)} />
        <Route path="/detail" component={requireAuthentication(DetailView)} />
        <Route path="*" component={NotFoundView} />
    </Switch>

);
