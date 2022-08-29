import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


export const AuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if(!props.isAuth) return <Redirect to={'/login'} />
        return <Component {...props} />
    }

    let mapStateToPropsRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }
    let  AuthRedirectContainer = connect(mapStateToPropsRedirect)(RedirectComponent);
    return AuthRedirectContainer;
}
