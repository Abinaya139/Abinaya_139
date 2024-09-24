// Check if user is logged in
let loggedInUser = localStorage.getItem('username');

if (!loggedInUser) {
  window.location.href = 'index.html'; // Redirect to registration if not logged in
}

// Load posts from localStorage
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(post => {
    createPostElement(post.content, post.likes, post.dislikes, post.comments);
  });
}

// Create a new post
function createPost() {
  const postContent = document.getElementById('postContent').value;

  if (postContent) {
    const newPost = {
      content: postContent,
      likes: 0,
      dislikes: 0,
      comments: []
    };
    
    // Save the post to localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    
    createPostElement(newPost.content, newPost.likes, newPost.dislikes, newPost.comments);
    document.getElementById('postContent').value = ''; // Clear post input
  }
}

// Create post element for display
function createPostElement(content, likes, dislikes, comments) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  const contentParagraph = document.createElement('p');
  contentParagraph.textContent = content;
  postDiv.appendChild(contentParagraph);

  // Reactions section
  const reactionsDiv = document.createElement('div');
  reactionsDiv.classList.add('reactions');

  // Like button with small icon
  const likeButton = document.createElement('button');
  likeButton.classList.add('small-button');
  likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${likes}`;
  likeButton.onclick = function() {
    likes++;
    likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${likes}`;
    updatePostInLocalStorage(content, likes, dislikes, comments); // Update in localStorage
  };

  // Dislike button with small icon
  const dislikeButton = document.createElement('button');
  dislikeButton.classList.add('small-button');
  dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${dislikes}`;
  dislikeButton.onclick = function() {
    dislikes++;
    dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${dislikes}`;
    updatePostInLocalStorage(content, likes, dislikes, comments); // Update in localStorage
  };

  // Append like and dislike buttons
  reactionsDiv.appendChild(likeButton);
  reactionsDiv.appendChild(dislikeButton);

  // Comment input
  const commentInput = document.createElement('input');
  commentInput.placeholder = 'Add a comment...';
  commentInput.classList.add('comment-input');

  // Comment button
  const commentButton = document.createElement('button');
  commentButton.classList.add('small-button');
  commentButton.textContent = 'Comment';

  // Comments list
  const commentsList = document.createElement('div');
  commentsList.classList.add('comments-list');

  // Append comment input and button under the reactions
  reactionsDiv.appendChild(commentInput);
  reactionsDiv.appendChild(commentButton);

  // Append reactions and comments list to the post
  postDiv.appendChild(reactionsDiv);
  postDiv.appendChild(commentsList);
  document.getElementById('posts').prepend(postDiv);

  // Load existing comments
  comments.forEach(comment => {
    const commentDiv = document.createElement('p');
    commentDiv.textContent = comment;
    commentsList.appendChild(commentDiv);
  });

  // Handle comments
  commentButton.onclick = function() {
    const commentText = commentInput.value;
    if (commentText) {
      const commentDiv = document.createElement('p');
      commentDiv.textContent = commentText;
      commentsList.appendChild(commentDiv);
      comments.push(commentText); // Store comment
      commentInput.value = ''; // Clear input
      updatePostInLocalStorage(content, likes, dislikes, comments); // Update in localStorage
    }
  };
}

// Update post in localStorage
function updatePostInLocalStorage(content, likes, dislikes, comments) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const postIndex = posts.findIndex(post => post.content === content);
  if (postIndex !== -1) {
    posts[postIndex].likes = likes;
    posts[postIndex].dislikes = dislikes;
    posts[postIndex].comments = comments;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

// Load posts on page load
loadPosts();
