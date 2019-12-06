import {profileReducer, deletePost, addPostActionCreator} from "./profile-reducer";


it('length of posts should be incremented', () => {
	// 3. test data
	let state = {
		posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It is my first post', likesCount: 22},
		{id: 3, message: 'Good', likesCount: 14},
		{id: 4, message: 'BB', likesCount: 16}
		]
	}
	let action = addPostActionCreator("it-kama");

	// 2. action
	let newState = profileReducer(state, action); // 1 - state, 2 - action
	
	// 3. expectation
	expect(newState.posts.length).toBe(5); // будет ли значение в () ранво toBe()
});


it('message of new post should be correct', () => {
	// 3. test data
	let state = {
		posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It is my first post', likesCount: 22},
		{id: 3, message: 'Good', likesCount: 14},
		{id: 4, message: 'BB', likesCount: 16}
		]
	}
	let action = addPostActionCreator("it-kama");

	// 2. action
	let newState = profileReducer(state, action); // 1 - state, 2 - action
	
	// 3. expectation
	expect(newState.posts[4].message).toBe("it-kama"); // будет ли значение в () ранво toBe()
});


it('after deleting length of messages ', () => {
	// 3. test data
	let state = {
		posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It is my first post', likesCount: 22},
		{id: 3, message: 'Good', likesCount: 14},
		{id: 4, message: 'BB', likesCount: 16}
		]
	}
	let action = deletePost(1);

	// 2. action
	let newState = profileReducer(state, action); // 1 - state, 2 - action
	
	// 3. expectation
	expect(newState.posts.length).toBe(3); // будет ли значение в () ранво toBe()
});








