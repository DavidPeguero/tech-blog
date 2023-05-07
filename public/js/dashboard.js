const newPost = () => {
    document.location.replace('/new-post');
}

document.getElementById('new-post').addEventListener('click', newPost)

let allPosts = document.querySelectorAll('.post-title');
allPosts.forEach((post) => post.addEventListener('click', (event) => {
    document.location.replace(`/edit-post/${event.target.dataset.postId}`)
}))