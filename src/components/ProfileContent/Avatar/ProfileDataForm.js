import React from "react";
import {Field, reduxForm} from "redux-form";
import {Contacts} from "./Avatar";
import {Input, Textarea} from "../../Common/FormsControl/FormsControl";
import style from '../../Common/FormsControl/FormsControl.module.css';

const ProfileDataReduxForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <button>Save</button>
                </div>
                {props.error &&
                    <div className={style.error}>{props.error}</div>
                }
                <div>
                    <b>Full name: </b>
                    <Field component={Input} name={'fullName'} placeholder={'Full name'}/>
                </div>
                <div>
                    <b>Looking for a job: </b>
                    <Field component={Input} name={'lookingForAJob'} type={'checkbox'}/>
                </div>
                <div>
                    <b>My professional skills :</b>
                    <Field component={Textarea} name={'lookingForAJobDescription'} placeholder={'My professional skills'}/>
                </div>
                <div>
                    <b>About me:</b>
                    <Field component={Input} name={'aboutMe'} placeholder={'About me'}/>
                </div>
                <div><b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
                    return (
                    <div>
                        <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                        <Field component={Input} name={`contacts.${key}`} placeholder={key} />
                    </div>
                    );
                })}
                </div>
            </form>
    );
}

export const ProfileDataForm = reduxForm({form: 'editProfile'})(ProfileDataReduxForm);