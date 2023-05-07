const newPost = () => {
    document.location.replace('/new-post');
}

document.getElementById('new-post').addEventListener('click', newPost)