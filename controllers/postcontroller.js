
const posts = [
    {id: 1, title: 'Post 1', body: 'This is post'},
    {id: 2, title: 'Post 2', body: 'This is post'},
    {id: 3, title: 'Post 3', body: 'This is post'}

]; 



//desc get all posts
//route get /api/posts

export const getPosts =  ((req,res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
       return res.status(200).json(posts.slice(0, limit));
    } 
        res.status(200).json(posts);
});



//desc get single post
//groute /api/posts/:id
export const getPost = ((req,res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
     if(!post) {
     const error = new Error(`Post not found`);
     error.status = 404;
     return next(error);
     }
         res.status(200).json(post);
 });


 //desc create new post
 //route POST /api/posts 
export const  newPost = ((req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        body: req.body.body
    };

    if(!newPost.title || !newPost.body) {
        const error = new Error(`please include all required fields`);
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(200).json(posts);
})


  //desc update post
 //route put /api/posts 
 export const updatePost = ((req, res, next) => {
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



  //desc  delete post
 //route delete /api/posts 

export const deletePost = ((req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
        .status(400)
        .json({ msg: `please a post with id of ${id} was not found`});

    }
    res.status(200).json(posts.filter((post) => post.id !== id));
});