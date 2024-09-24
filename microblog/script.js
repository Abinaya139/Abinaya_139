// Check if user is logged in
let loggedInUser = localStorage.getItem('username');

if (!loggedInUser) {
  window.location.href = 'index.html'; // Redirect to registration if not logged in
}

// Load posts from localStorage on page load
function loadPosts() {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.forEach(post => renderPost(post));
}

// Create a new post
function createPost() {
  const postContent = document.getElementById('postContent').value;
  const postImageInput = document.getElementById('postImage');
  const postImage = postImageInput.files[0];

  const newPost = {
    content: postContent,
    timestamp: new Date().toLocaleString(),
    likes: 0,
    dislikes: 0,
    comments: [],
    image: postImage ? URL.createObjectURL(postImage) : null
  };

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPost(newPost);
  document.getElementById('postContent').value = '';
  postImageInput.value = '';
}

// Render a single post
function renderPost(post) {
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  const contentParagraph = document.createElement('p');
  contentParagraph.textContent = post.content;
  postDiv.appendChild(contentParagraph);

  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = 'Post Image';
    img.style.maxWidth = '100%'; // Responsive image
    postDiv.appendChild(img);
  }

  const timestamp = document.createElement('p');
  timestamp.textContent = `Posted on: ${post.timestamp}`;
  postDiv.appendChild(timestamp);

  // Reactions section
  const reactionsDiv = document.createElement('div');
  reactionsDiv.classList.add('reactions');

  // Like button
  const likeButton = document.createElement('button');
  likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${post.likes}`;
  likeButton.onclick = function() {
    post.likes++;
    updatePostInStorage(post);
    likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${post.likes}`;
  };

  // Dislike button
  const dislikeButton = document.createElement('button');
  dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${post.dislikes}`;
  dislikeButton.onclick = function() {
    post.dislikes++;
    updatePostInStorage(post);
    dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${post.dislikes}`;
  };

  reactionsDiv.appendChild(likeButton);
  reactionsDiv.appendChild(dislikeButton);
  postDiv.appendChild(reactionsDiv);

  // Comment section
  const commentInput = document.createElement('input');
  commentInput.placeholder = 'Add a comment...';

  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';

  const commentsList = document.createElement('div');

  commentButton.onclick = function() {
    const commentText = commentInput.value;
    if (commentText) {
      const comment = { text: commentText, timestamp: new Date().toLocaleString(), likes: 0, dislikes: 0 };
      post.comments.push(comment);
      updatePostInStorage(post);
      renderComment(comment, commentsList);
      commentInput.value = ''; // Clear input
    }
  };

  postDiv.appendChild(commentInput);
  postDiv.appendChild(commentButton);
  postDiv.appendChild(commentsList);
  document.getElementById('posts').appendChild(postDiv);

  // Render existing comments
  post.comments.forEach(comment => renderComment(comment, commentsList));
}

// Render a single comment
function renderComment(comment, commentsList) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  const commentText = document.createElement('p');
  commentText.textContent = comment.text;
  commentDiv.appendChild(commentText);

  const timestamp = document.createElement('p');
  timestamp.textContent = `Commented on: ${comment.timestamp}`;
  commentDiv.appendChild(timestamp);

  // Comment reactions
  const reactionsDiv = document.createElement('div');
  reactionsDiv.classList.add('reactions');

  // Like button for comment
  const likeButton = document.createElement('button');
  likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${comment.likes}`;
  likeButton.onclick = function() {
    comment.likes++;
    likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${comment.likes}`;
  };

  // Dislike button for comment
  const dislikeButton = document.createElement('button');
  dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${comment.dislikes}`;
  dislikeButton.onclick = function() {
    comment.dislikes++;
    dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${comment.dislikes}`;
  };

  reactionsDiv.appendChild(likeButton);
  reactionsDiv.appendChild(dislikeButton);
  commentDiv.appendChild(reactionsDiv);
  commentsList.appendChild(commentDiv);
}

// Update post in localStorage
function updatePostInStorage(updatedPost) {
  const posts = JSON.parse(localStorage.getItem('posts'));
  const index = posts.findIndex(post => post.timestamp === updatedPost.timestamp);
  if (index !== -1) {
    posts[index] = updatedPost;
    localStorage.setItem('posts', JSON.stringify(posts));
  }
}

// Load posts on page load
loadPosts();
