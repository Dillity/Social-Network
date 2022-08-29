import React from "react";
import style from './Messages.module.css';
import DialogNames from "./DialogNames/DialogNames";
import SingleMessage from "./SingleMessage/SingleMessage";
import {Field, reduxForm} from "redux-form";

const Messages = (props) => {


    let addNewMessage = (values) => {
        props.addMessage(values.newMessageElement);
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {props.dialogs.dialogNames.map(name => <DialogNames name={name.name} id={name.id} key={name.id} />)}
            </div>
            <div className={style.vl}></div>
            <div className={style.messages}>
                {props.dialogs.dialogMessages.map(message => <SingleMessage message={message.message} key={message.id} />)}
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}


const AddMessageForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field rows='6' cols='60' component={'textarea'} name={'newMessageElement'} placeholder='Enter your message'/>
                </div>
                <div>
                    <button>Send!</button>
                </div>
            </form>
        </div>
    );
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);
export default Messages;