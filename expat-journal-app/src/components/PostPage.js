import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import '../styles/post.css';
import HeaderPostButton from './HeaderPostButton';

const PostPage = (props) => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/posts/${id}`)
            .then(res => {
                console.log('Post: useEffect: DT: ', res);

                setPost(res.data);
            })
            .catch(err => console.error('Post: useEffect: DT: Error: ', err));
    }, [id]);

    return(
        <>
            <div className='singlePost'>
                <h2>{post.title}</h2>
                <img src={`${post.imageURL}`} className={`${post.imageURL ? '':'hide'}`}/>
                <p>{post.description}</p>
            </div>
            <HeaderPostButton className='updateButton'editing='true' />
        </>
    );
};

export default PostPage;