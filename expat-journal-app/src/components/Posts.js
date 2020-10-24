import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ContextObject } from '../context/context';
import Post from './Post';

import '../styles/post.css';

const Posts = () => {
	const data = useContext(ContextObject);
    const { push } = useHistory();

	return (
        <>
            <div className='post-card'>
                {data.postState.posts.map((post) => (
                    <Link to={`/post/${post.postId}`}>
                        <Post key={post.postId} post={post} />
                    </Link>
                ))}
            </div>
        </>
	);
};

export default Posts;
