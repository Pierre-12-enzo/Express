const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const formBtn = document.querySelector('#add-post');


//get and show

async function showPosts() {
    const res = await fetch('http://localhost:3000/api/posts');
try {
    if(!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    output.innerHTML = '';

    posts.forEach((post)=> {
        const postEL = document.createElement('div');
        postEL.textContent = post.title + post.body;
        output.appendChild(postEL);
    });
} catch (error) {
    console.error('Error fetching posts:', error);
}
}



//Add post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const title = formData.get('title');
    const body = formData.get('body');

    try {
        const res = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, body})
        })

        if (!res.ok) {
            throw new Error('Failed to add post');
        } 
        const newPost = await res.json();

        const postEL = document.createElement('div');
        postEL.textContent = newPost.title + newPost.body;
        output.appendChild(postEL);
        showPosts();
        } catch {
            console.error('Error adding post');
        }
    }




    //event listener

button.addEventListener('click',showPosts);
formBtn.addEventListener('submit', addPost);
