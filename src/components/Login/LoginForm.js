import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utilities/validators/validators";
import {Input} from "../Common/FormsControl/FormsControl";
import style from '../Common/FormsControl/FormsControl.module.css';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}/>Remember me
            </div>
            {props.error &&
                <div className={style.error}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
