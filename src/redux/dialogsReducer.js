let initialState = {

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
    ]
}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD-MESSAGE':

            return {
                ...state,
                dialogMessages: [...state.dialogMessages, {id:3, message: action.newMessage}],
            }

        default:
            return state;
    }
}

export const addMessageActionCreator = (newMessage) => ({type: 'ADD-MESSAGE', newMessage});

export default dialogsReducer;