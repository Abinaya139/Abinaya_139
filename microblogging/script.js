let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentPostId = null;

// Function to signup/login
function signup() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username && password) {
        currentUser = users.find(user => user.username === username);

        if (!currentUser) {
            // Create new user if they don't exist
            currentUser = {
                id: Date.now(),
                username: username,
                password: password,
                likedPosts: [],
                following: []
            };
            users.push(currentUser);
            localStorage.setItem('users', JSON.stringify(users));
            showAlert('Account created successfully!');
        } else if (currentUser.password !== password) {
            showAlert('Incorrect password, please try again.', true);
            return;
        } else {
            showAlert('Logged in successfully!');
        }

        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        usernameInput.value = '';
        passwordInput.value = '';
        document.getElementById('user-id').innerText = currentUser.username;
        showPage('home-page');
        displayFeed();
        displayOtherUsers();
    } else {
        showAlert('Please enter both username and password.', true);
    }
}

// Function to logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showPage('login-page');
}

// Function to show the desired page
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Display the current page
    document.getElementById(pageId).style.display = 'block';
}

// Display the feed
function displayFeed() {
    const feedDiv = document.getElementById('feed');
    feedDiv.innerHTML = '';

    const visiblePosts = posts.filter(post =>
        currentUser.following.includes(post.userId) || post.userId === currentUser.id
    );

    if (visiblePosts.length === 0) {
        feedDiv.innerHTML = '<p>No posts to display. Follow users or create a post!</p>';
    } else {
        visiblePosts.forEach(post => {
            const postDiv = createPostDiv(post);
            feedDiv.appendChild(postDiv);
        });
    }

    updateUserStats();
}

// Update user stats (followers and following count)
function updateUserStats() {
    const followingCount = currentUser.following.length;
    const followerCount = users.filter(user => user.following.includes(currentUser.id)).length;

    document.getElementById('follower-count').innerText = followerCount;
    document.getElementById('following-count').innerText = followingCount;
}

// Create post div
function createPostDiv(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
        <h4>${post.username} <small>${post.date}</small></h4>
        <p>${post.text}</p>
        ${post.image ? <img src="${post.image}" alt="Post Image" style="max-width: 100%;"> : ''}
        <button class="like-button" onclick="likePost(${post.id})">
            ${currentUser.likedPosts.includes(post.id) ? '❤️' : '🤍'} (${post.likes})
        </button>
        <button onclick="showComments(${post.id})">Comment</button>
        ${post.userId === currentUser.id ? <button onclick="deletePost(${post.id})">Delete</button> : ''}
        <div class="comments">
            <h5>Comments</h5>
            <div id="comments-${post.id}">${createCommentsHtml(post.comments)}</div>
            <input type="text" id="new-comment-${post.id}" placeholder="Add a comment">
            <button onclick="addComment(${post.id})">Submit Comment</button>
        </div>
    `;
    return postDiv;
}

// Create comments HTML
function createCommentsHtml(comments) {
    if (comments.length === 0) {
        return '<p>No comments yet.</p>';
    }

    return comments.map(comment => `
        <div class="comment">
            <strong>${comment.username}</strong> <small>${comment.date}</small>
            <p>${comment.text}</p>
        </div>
    `).join('');
}

// Create a post
function createPost() {
    const postText = document.getElementById('post-text').value.trim();
    const postImageInput = document.getElementById('post-image');
    const postImage = postImageInput.files[0];

    if (!postText && !postImage) {
        showAlert('Please enter text or select an image.', true);
        return;
    }

    const createPostObject = (imageData = null) => {
        const post = {
            id: Date.now(),
            userId: currentUser.id,
            username: currentUser.username,
            text: postText,
            image: imageData,
            likes: 0,
            comments: [],
            date: new Date().toLocaleString()
        };
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayFeed();
        showAlert('Post created successfully!');
        document.getElementById('post-text').value = '';
        postImageInput.value = '';
    };

    if (postImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
            createPostObject(e.target.result);
        };
        reader.readAsDataURL(postImage);
    } else {
        createPostObject();
    }
}

// Function to show comments for a post
function showComments(postId) {
    currentPostId = postId;
    displayFeed();  // Update feed to ensure latest data is shown
}

// Function to add a comment
function addComment(postId) {
    const commentInput = document.getElementById(new-comment-${postId});
    const commentText = commentInput.value.trim();
    const post = posts.find(p => p.id === postId);

    if (commentText) {
        const comment = {
            username: currentUser.username,
            text: commentText,
            date: new Date().toLocaleString()
        };
        post.comments.push(comment);
        localStorage.setItem('posts', JSON.stringify(posts));
        commentInput.value = '';
        const commentsDiv = document.getElementById(comments-${postId});
        commentsDiv.innerHTML = createCommentsHtml(post.comments);
        showAlert('Comment added successfully!');
    } else {
        showAlert('Please enter a comment.', true);
    }
}

// Function to like/unlike a post
function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    const likedIndex = currentUser.likedPosts.indexOf(postId);

    if (likedIndex === -1) {
        currentUser.likedPosts.push(postId);
        post.likes += 1;
        showAlert('Post liked!');
    } else {
        currentUser.likedPosts.splice(likedIndex, 1);
        post.likes -= 1;
        showAlert('Post unliked!');
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('posts', JSON.stringify(posts));
    displayFeed();
}

// Function to delete a post
function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayFeed();
    showAlert('Post deleted successfully!');
}

// Function to follow/unfollow a user
function followUser(userId) {
    const userToFollow = users.find(user => user.id === userId);
    const followingIndex = currentUser.following.indexOf(userId);

    if (followingIndex === -1) {
        currentUser.following.push(userId);
        userToFollow.followers.push(currentUser.id);
        showAlert(You are now following ${userToFollow.username}!);
    } else {
        currentUser.following.splice(followingIndex, 1);
        userToFollow.followers.splice(userToFollow.followers.indexOf(currentUser.id), 1);
        showAlert(You unfollowed ${userToFollow.username}.);
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    displayOtherUsers();
}

// Display other users to follow
function displayOtherUsers() {
    const followList = document.getElementById('follow-users-list');
    followList.innerHTML = '';

    const otherUsers = users.filter(user => user.id !== currentUser.id);

    otherUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <span>${user.username}</span>
            <button onclick="followUser(${user.id})">
                ${currentUser.following.includes(user.id) ? 'Unfollow' : 'Follow'}
            </button>
        `;
        followList.appendChild(userDiv);
    });
}

// Function to show alert messages
function showAlert(message, isError = false) {
    const alertBox = document.getElementById('alert-box');
    alertBox.innerText = message;
    alertBox.className = alert ${isError ? 'error' : 'success'};
    alertBox.style.display = 'block';

    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
    const savedPage = localStorage.getItem('currentPage') || 'login-page';
    showPage(savedPage);
    if (currentUser) {
        document.getElementById('user-id').innerText = currentUser.username;
        showPage('home-page');
        displayFeed();
        displayOtherUsers();
    }
});
