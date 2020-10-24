import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import HeaderPostButton from './HeaderPostButton';
import useStyles from '../styles/postStyle';

const Post = (props) => {
	const classes = useStyles();
	const { post } = props;

    return(
        <>
            <Card className='post'>
                <h2>{post.title}</h2>
                <img src={`${post.imageURL}`} className={`${post.imageURL ? '':'hide'}`}/>
                <p>{post.description}</p>
            </Card>
        </>
    );
};

export default Post;
