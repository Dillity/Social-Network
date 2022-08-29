import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

let store = {
    _state: {
        profilePage: {

            postData: [
                {id: 1, post: 'Hello', likesCount: 5},
                {id: 2, post: 'What is your name?', likesCount: 12},
                {id: 3, post: 'I like music', likesCount: 1}
            ],
            newPostText : ''

        },
        dialogs: {

            dialogNames: [
                {id: 1, name: 'Vova'},
                {id: 2, name: 'Peter'},
                {id: 3, name: 'Anna'},
                {id: 4, name: 'Mike'},
                {id: 5, name: 'Vera'}
            ],
            dialogMessages: [
                {id: 1, message: 'Hi man'},
                {id: 2, message: 'Lets go out'}
            ],
            newMessageText: ''
        },
    },
    _rerenderEntireTree() {
        console.log('State is changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    dispatch(action) {

       this._state.profilePage = profileReducer(this._state.profilePage, action);
       this._state.dialogs = dialogsReducer(this._state.dialogs, action);
       this._rerenderEntireTree(this._state);

    }
}



export default store;
