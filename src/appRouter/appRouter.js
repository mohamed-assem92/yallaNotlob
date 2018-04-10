import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from '../components/login';
import Register from '../components/register';
import NavbarFeatures from '../components/navBar';
import Home from '../components/home';
import AddOrder from '../components/addOrder';
import Friend from '../components/friend';
import Groups from '../components/groups';
import Notifications from '../components/notifications';
import Orders from '../components/orders';
import ViewOrder from '../components/viewOrder';
import ForgetPsw from '../components/forgetPsw';
import ResetPsw from '../components/resetPsw';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

class AppRouter extends React.Component {
    state = {
        jwt: localStorage.getItem('token')
    }

    render() {
        return (
            <BrowserRouter>
            <div>
                    
                {this.state.jwt && < NavbarFeatures /> }
                <Switch>
                    <PrivateRoute path="/" component={Home} exact={true} />
                    <PrivateRoute path="/home" component={Home} exact={true} />
                    <PrivateRoute path="/friend" component={Friend} exact={true} />
                    <PrivateRoute path="/groups" component={Groups} exact={true} />
                    <PrivateRoute path="/addOrder" component={AddOrder} exact={true} />
                    <PrivateRoute path="/viewOrder/:id" component={ViewOrder} exact={true} />
                    <PrivateRoute path="/orders" component={Orders} exact={true} />
                    <PrivateRoute path="/notifications" component={Notifications} exact={true} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/password/forget" component={ForgetPsw} />
                    <Route exact path="/password/reset" component={ResetPsw} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
