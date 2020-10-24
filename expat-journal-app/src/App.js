import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Posts from './components/Posts';
import Post from './components/Post';
import PostPage from './components/PostPage';
import Header from './components/Header';
import PostForm from './components/PostForm';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContextObject } from './context/context';

import axiosWithAuth from './utils/axiosWithAuth';

const initialState = {
	posts: [],
	error: '',
};

function App() {
	const [postState, setPostState] = useState(initialState);

	useEffect(() => {
		axiosWithAuth()
			.get(`/api/posts`)
			.then((res) => {
				console.log('App: useEffect: DT: ', res.data);

        const posts = res.data.sort((a, b) => {
          if(a.postId > b.postId){
            console.log(true);
            return -1;
          }
          else{
            console.log(false);
            return 1;
          }
        });

        // const posts = res.data.reverse();

				setPostState({
					...postState,
					posts: posts,
        });
        

			})
			.catch((err) => console.error('App: useEffect: DT: Error: ', err));
	}, []);

	return (
		<Router>
			<ContextObject.Provider value={{ postState, setPostState }}>
				<div className='App'>
					{/* <h1>Expat Journal</h1>
          <h2>Login</h2> */}
					<Header />

					<PrivateRoute exact path='/posts'>
						<Posts />
					</PrivateRoute>

					<Route exact path='/post/:id'>
						<PostPage />
					</Route>

					<Route exact path='/create-post'>
						<PostForm editing='false' />
					</Route>

					<Route exact path='/edit-post/:id'>
						<PostForm editing='true' />
					</Route>

					<Route exact path='/'>
						<Login />
					</Route>
					<Route exact path='/register'>
						<Register />
					</Route>
				</div>
			</ContextObject.Provider>
		</Router>
	);
}

export default App;
