import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
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



const AppRouter =()=> (
    <BrowserRouter>
        <div>
        <NavbarFeatures />
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
                <Route path="/addOrder" component={AddOrder}/>
                <Route path="/friend" component={Friend}/>
                <Route path="/groups" component={Groups}/>
                <Route path="/notifications" component={Notifications}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/viewOrder" component={ViewOrder}/>
                <Route path="/password/forget" component={ForgetPsw}/>
                <Route path="/password/reset" component={ResetPsw}/>


            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;
