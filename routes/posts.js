import express from 'express';
const router = express.Router();
import { deletePost, getPost, getPosts, newPost, updatePost, } from '../controllers/postcontroller.js'




//get all posts
router.get('/', getPosts);

//get single posts
router.get('/:id', getPost);

//create new post
router.post('/', newPost);

//update post
router.put('/:id',updatePost);


//Delete post
router.delete('/:id',deletePost);


export default router;