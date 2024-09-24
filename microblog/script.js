let currentUser = null;

// Register a new user
async function registerUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill in both fields!");
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Failed to register: " + errorData.message);
      return;
    }

    const data = await response.json();
    currentUser = data;
    document.getElementById("registration").style.display = "none";
    document.getElementById("feed").style.display = "block";
    loadFeed();
  } catch (error) {
    alert("Error connecting to server. Please try again.");
  }
}

// Create a new post
async function createPost() {
  const content = document.getElementById("postContent").value;
  const postImage = document.getElementById("postImage").files[0];
  let imageUrl = '';

  if (postImage) {
    imageUrl = URL.createObjectURL(postImage); // Just simulate image upload
  }

  if (!content) {
    alert("Please enter content!");
    return;
  }

  try {
    const response = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, authorUsername: currentUser.username, imageUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Failed to create post: " + errorData.message);
      return;
    }

    document.getElementById("postContent").value = "";
    document.getElementById("postImage").value = "";
    loadFeed();
  } catch (error) {
    alert("Error connecting to server. Please try again.");
  }
}

// Load the user's feed
async function loadFeed() {
  try {
    const response = await fetch(/api/posts/feed/${currentUser.username});
    if (!response.ok) {
      const errorData = await response.json();
      alert("Failed to load feed: " + errorData.message);
      return;
    }

    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
      const postDiv = document.createElement("div");
      postDiv.className = "post";
      postDiv.innerHTML = `<strong>${post.authorUsername}:</strong> ${post.content}
        ${post.imageUrl ? <img src="${post.imageUrl}" alt="Post Image"> : ''}
        <div class="likes">Likes: ${post.likes} <button onclick="likePost('${post.id}')">Like</button></div>`;
      postsContainer.appendChild(postDiv);
    });
  } catch (error) {
    alert("Error loading feed. Please try again.");
  }
}

// Like a post
async function likePost(postId) {
  try {
    await fetch("/api/posts/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId }),
    });

    loadFeed();
  } catch (error) {
    alert("Error liking post. Please try again.");
  }
}

// Follow a user by username
async function followUser() {
  const followUsername = document.getElementById("followUsername").value;

  if (!followUsername) {
    alert("Please enter a username to follow!");
    return;
  }

  try {
    const response = await fetch("/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerUsername: currentUser.username, followeeUsername: followUsername }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Failed to follow: " + errorData.message);
      return;
    }

    loadFeed();
  } catch (error) {
    alert("Error following user. Please try again.");
  }
}

// Unfollow a user by username
async function unfollowUser() {
  const followUsername = document.getElementById("followUsername").value;

  if (!followUsername) {
    alert("Please enter a username to unfollow!");
    return;
  }

  try {
    const response = await fetch("/api/unfollow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerUsername: currentUser.username, followeeUsername: followUsername }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert("Failed to unfollow: " + errorData.message);
      return;
    }

    loadFeed();
  } catch (error) {
    alert("Error unfollowing user. Please try again.");
  }
}let loggedIn = false;

// Login function
document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication check (you can improve this with real validation)
    if (username && password) {
        loggedIn = true;
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('postForm').style.display = 'block';
    } else {
        alert('Please enter a valid username and password.');
    }
});

// Handle post submission
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const contentParagraph = document.createElement('p');
    contentParagraph.textContent = postContent;
    postDiv.appendChild(contentParagraph);

    if (postImage) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(postImage);
        postDiv.appendChild(img);
    }

    // Reaction section with emojis
    const reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');

    const emojiButtons = ['👍', '❤️', '😢', '😡', '😂'];
    const likeCounts = Array(emojiButtons.length).fill(0);

    emojiButtons.forEach((emoji, index) => {
        const button = document.createElement('button');
        button.textContent = emoji + ' (0)';
        button.classList.add('emoji-button');

        button.addEventListener('click', function() {
            likeCounts[index]++;
            button.textContent = emoji + ` (${likeCounts[index]})`;
        });

        reactionsDiv.appendChild(button);
    });

    postDiv.appendChild(reactionsDiv);

    // Comment section
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    commentInput.placeholder = 'Add a comment...';
    
    const commentButton = document.createElement('button');
    commentButton.classList.add('comment-input-button');
    commentButton.textContent = 'Comment';

    commentButton.addEventListener('click', function() {
        const commentText = commentInput.value;
        if (commentText) {
            const commentDiv = document.createElement('p');
            commentDiv.textContent = commentText;
            commentSection.appendChild(commentDiv);
            commentInput.value = ''; // Clear input
        }
    });

    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentButton);
    postDiv.appendChild(commentSection);

    document.getElementById('postsContainer').prepend(postDiv);
    document.getElementById('postForm').reset(); // Reset form
});
