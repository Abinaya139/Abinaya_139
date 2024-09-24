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

function createPost(content, imageSrc, timestamp) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postContent = document.createElement('p');
    postContent.textContent = content;

    const postDate = document.createElement('small');
    postDate.classList.add('timestamp');
    postDate.textContent = timestamp;

    const postImage = document.createElement('img');
    postImage.classList.add('post-image');
    if (imageSrc) {
        postImage.src = imageSrc;
        postImage.style.display = 'block';
    } else {
        postImage.style.display = 'none';
    }

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.innerHTML = '❤️ Like (0)';
    likeButton.likesCount = 0; // Initialize likes count
    likeButton.addEventListener('click', function() {
        this.classList.toggle('liked');
        if (this.classList.contains('liked')) {
            this.likesCount++;
            this.innerHTML = `❤️ Liked (${this.likesCount})`;
        } else {
            this.likesCount--;
            this.innerHTML = `❤️ Like (${this.likesCount})`;
        }
    });

    postElement.appendChild(postContent);
    postElement.appendChild(postDate);
    postElement.appendChild(postImage);
    postElement.appendChild(likeButton);

    return postElement;
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const postContent = document.getElementById('postContent').value.trim();
    const postImage = document.getElementById('postImage').files[0];

    if (postContent) {
        const postsContainer = document.getElementById('posts');
        
        const timestamp = new Date().toLocaleString(); // Get current date and time
        const imageSrc = postImage ? URL.createObjectURL(postImage) : null;

        const newPost = createPost(postContent, imageSrc, timestamp);
        postsContainer.prepend(newPost); // Add new post to the top
        document.getElementById('postContent').value = ''; // Clear the textarea
        document.getElementById('postImage').value = ''; // Clear the file input
    }
});

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
