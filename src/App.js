import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Routes, Route, withRouter} from "react-router-dom";

import {HeaderContainer} from "./components/Header/HeaderContainer";
import {Login} from "./components/Login/Login";
import React, {Suspense} from "react";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/Common/Preloader/Preloader";

const MessagesContainer = React.lazy(() => import ("./components/Messages/MessagesContainer"));
const News = React.lazy(() => import ("./components/News/News"));
const Music = React.lazy(() => import ("./components/Music/Music"));
const UsersContainer = React.lazy(() => import ("./components/Users/UsersContainer"));
const ProfileContainer = React.lazy(() => import ("./components/ProfileContent/ProfileContainer"));
const Settings = React.lazy(() => import ("./components/Settings/Settings"));

class AppC extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='wrapper-content'>
                    <Suspense fallback={<div><Preloader /></div>}>
                        {/*<Routes>*/}
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/' exact render={() => <ProfileContainer/>}/>
                        <Route path='/messages/' render={() => <MessagesContainer/>}/>
                        <Route path='/users/' render={() => <UsersContainer/>}/>
                        <Route path='/news/' render={() => <News/>}/>
                        <Route path='/music/' render={() => <Music/>}/>
                        <Route path='/settings/' render={() => <Settings/>}/>
                        <Route path='/login/' render={() => <Login/>}/>
                        {/*<Route path='*' exact render={() => <div>404 NOT FOUND</div>}/>*/}
                        {/*</Routes>*/}
                    </Suspense>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
}


const App = (connect(mapStateToProps, {initializeApp})(AppC));
export default App;
