import profileReducer, {addPostActionCreator} from "./profileReducer";

let state = {
    postData: [
        {id: 1, post: 'Hello', likesCount: 5},
        {id: 2, post: 'What is your name?', likesCount: 12},
        {id: 3, post: 'I like music', likesCount: 1}
    ]
}

it('new post should be added', () => {

    let action = addPostActionCreator('vova');
    let newState = profileReducer(state, action);
    expect(newState.postData.length).toBe(4);
});

it('should be same', () => {

    let action = addPostActionCreator('vova');
    let newState = profileReducer(state, action);
    expect(newState.postData[3].post).toBe('vova');
});


