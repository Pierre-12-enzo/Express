import express from 'express';
const router = express.Router();


const posts = [
    {id: 1, title: 'Post 1', body: 'This is post'},
    {id: 2, title: 'Post 2', body: 'This is post'},
    {id: 3, title: 'Post 3', body: 'This is post'}

]; 


//get all posts
router.get('/', (req,res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
       return res.status(200).json(posts.slice(0, limit));
    } 
        res.status(200).json(posts);
});

//get single posts
router.get('/:id', (req,res) => {
    const id = parseInt(req.params.id);
   const post = posts.find((post) => post.id === id);
    if(!post) {
       return res.status(404).json({message: 'Post not found'});
    }
        res.status(200).json(post);
});

//create new post
router.post('/', (req,res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body
    };

    if(!newPost.title || !newPost.body) {
        return res.status(400).json({ msg: 'please include all required fields'});
    }
    posts.push(newPost);
    res.status(200).json(posts);
});

//update post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
        .status(400)
        .json({ msg: `please a post with id of ${id} was not found`});

    }

    post.title = req.body.title;
    post.body = req.body.body;
    res.status(200).json(posts);

});


//Delete post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
        .status(400)
        .json({ msg: `please a post with id of ${id} was not found`});

    }
    res.status(200).json(posts.filter((post) => post.id !== id));
});


export default router;