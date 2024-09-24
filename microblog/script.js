let currentUser = null;
const users = [];
const posts = [];
const followersMap = {};

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        users.push({ username, password });
        currentUser = username;
        followersMap[username] = []; // Initialize followers for the new user
        alert('Registration successful!');

        document.getElementById('registration').style.display = 'none';
        document.getElementById('feed').style.display = 'block';
        displayFollowers();
    } else {
        alert('Please enter a username and password.');
    }
}

function createPost() {
    const content = document.getElementById('postContent').value;
    const imageFile = document.getElementById('postImage').files[0];

    if (content) {
        const post = {
            content,
            image: imageFile ? URL.createObjectURL(imageFile) : null,
            author: currentUser,
            likes: 0,
            likedBy: [] // Track users who liked the post
        };
        posts.push(post);
        displayPosts();
        document.getElementById('postContent').value = '';
        document.getElementById('postImage').value = '';
    } else {
        alert('Please enter some content for your post.');
    }
}

function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const content = document.createElement('p');
        content.textContent = post.content;

        if (post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            img.style.maxWidth = '200px';
            postDiv.appendChild(img);
        }

        const author = document.createElement('small');
        author.textContent = `Posted by: ${post.author}`;
        postDiv.appendChild(author);

        const likeButton = document.createElement('button');
        likeButton.textContent = `Like (${post.likes})`;
        likeButton.onclick = () => likePost(index);
        postDiv.appendChild(likeButton);

        postsContainer.appendChild(postDiv);
    });
}

function likePost(postIndex) {
    const post = posts[postIndex];

    if (!post.likedBy.includes(currentUser)) {
        post.likes++;
        post.likedBy.push(currentUser);
    } else {
        post.likes--;
        post.likedBy = post.likedBy.filter(user => user !== currentUser);
    }
    
    displayPosts();
}

function followUser() {
    const usernameToFollow = document.getElementById('followUsername').value;

    if (users.some(user => user.username === usernameToFollow) && usernameToFollow !== currentUser) {
        if (!followersMap[usernameToFollow].includes(currentUser)) {
            followersMap[usernameToFollow].push(currentUser);
            alert(`Followed ${usernameToFollow}`);
        } else {
            alert(`You are already following ${usernameToFollow}`);
        }
    } else {
        alert('User not found or you cannot follow yourself.');
    }

    displayFollowers();
}

function unfollowUser() {
    const usernameToUnfollow = document.getElementById('followUsername').value;

    if (followersMap[usernameToUnfollow]) {
        followersMap[usernameToUnfollow] = followersMap[usernameToUnfollow].filter(user => user !== currentUser);
        alert(`Unfollowed ${usernameToUnfollow}`);
    }

    displayFollowers();
}

function displayFollowers() {
    const followersContainer = document.getElementById('followers');
    followersContainer.innerHTML = '';

    const currentFollowers = Object.keys(followersMap).filter(user => followersMap[user].includes(currentUser));
    
    if (currentFollowers.length === 0) {
        followersContainer.textContent = 'You have no followers.';
    } else {
        currentFollowers.forEach(follower => {
            const followerDiv = document.createElement('div');
            followerDiv.textContent = follower;
            followersContainer.appendChild(followerDiv);
        });
    }
}
