import React, {useEffect, useState} from "react";


const ProfileStatusHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div>
            <h2>{props.name}</h2>
            <b>Status:</b>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}> {props.status || 'No status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onBlur={deactivateEditMode} autoFocus={true} onChange={onStatusChange} value={status}/>
                </div>
            }
        </div>
    );
}

export default ProfileStatusHooks;