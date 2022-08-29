import React from "react";
import {addMessageActionCreator} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import Messages from "./Messages";
import {AuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";



let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage,
        newMessageText: state.dialogsPage.newMessageText,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (newMessage) => {
            let action = addMessageActionCreator(newMessage);
            dispatch(action);
        }
    }
}

// compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     AuthRedirect)(Messages)

// let AuthRedirectContainer = AuthRedirect(Messages); // HOC
//
//
// const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectContainer);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    AuthRedirect)(Messages);