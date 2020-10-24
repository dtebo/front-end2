import {TextField, makeStyles, Typography, Button} from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

import { ContextObject } from '../context/context';
import PostPage from './PostPage';

const initialValues = {
    title: '',
    description:  '',
    imageURL: ''
};

const useStyles = makeStyles({
    title: {
        width: '30%',
        marginTop: '30px'
    },
    btn: {
        margin: '30px',
        width: '10%'
    },
    textbox: {
        width: '30%'
    },
    imgUrl: {
        margin: '20px',
        width: '30%'
    }
})


const PostForm = (props) => {
    const { editing } = props;
    const classes = useStyles()
    const { id } = useParams();
    const { postState, setPostState } = useContext(ContextObject);
    
    const [formValues, setFormValues] = useState(initialValues);
    const { push } = useHistory();

    useEffect(() => {
        if(editing === 'true'){
            axiosWithAuth()
                .get(`/api/posts/${id}`)
                .then(res => {
                    console.log('PostForm: useEffect: DT: ', res);

                    setFormValues(res.data);
                })
                .catch(err => console.error('PostForm: useEffect: DT: Error: ', err));
        }
    }, []);

    const handleChanges = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

     const handleSubmit = e => {
        e.preventDefault();

        if(editing === 'true'){
            axiosWithAuth()
                .put(`/api/posts/${id}`, formValues)
                .then(res => {
                    console.log('PostForm: handleSubmit: DT: ', res);

                    push(`/post/${id}`);
                })
                .catch(err => console.error('PostForm: handleSubmit: DT: Error: ', err));
        }
        else{
            axiosWithAuth()
                .post('/api/posts', formValues)
                .then(res => {
                    console.log('PostForm: handleSubmit: DT: ', res);
                    
                    setPostState({
                        ...postState,
                        posts: [...postState.posts, res.data]
                    });

                    push('/posts');
                })
                .catch(err => console.error('PostForm: handleSubmit: DT: Error: ', err));
        }
    };

    return(
        <>
            <Typography className='dynamicButton' component='h3' variant='h4'>{editing === 'true' ? 'Edit Post' : 'Create a New Post'}</Typography>
            <form className='form-container' noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField 
                    className={classes.title} 
                    id="standard-basic" 
                    label="Title" 
                    name='title' 
                    value={formValues.title} 
                    onChange={handleChanges} 
                    required
                />
                <br></br>
                <TextField 
                    className={classes.textbox} 
                    id='outlined-basic' 
                    label="Body" 
                    multiline 
                    name='description' 
                    value={formValues.description} 
                    onChange={handleChanges}
                    required
                    />
                <br></br>
                <TextField 
                    className={classes.imgUrl} 
                    id="standard-basic" 
                    label="Image Link"
                    name="imageURL"
                    required
                    value={formValues.imageURL}
                    onChange={handleChanges}
                    />
                <br></br>
                <Button className={classes.btn} variant="contained" color="primary" type='submit'>{editing === 'true' ? 'Update Post' : 'Add Post'}</Button>
            </form>
        </>
    );
};

export default PostForm;


// <label htmlFor='title'>Title</label>
//                 <input
//                     type='text'
//                     name='title'
//                     id='title'
//                     value={formValues.title}
//                     onChange={handleChanges}
//                 />
//                 <label htmlFor='body'>Body</label>
//                 <textarea
//                     name='body'
//                     id='body'
//                     value={formValues.body}
//                     onChange={handleChanges}
//                 />
//                 <label htmlFor='imageUrl'>Image</label>
//                 <input
//                     type='text'
//                     id='imageUrl'
//                     value={formValues.imageUrl}
//                     onChange={handleChanges}
//                 />
//                 <button>Add Post</button>