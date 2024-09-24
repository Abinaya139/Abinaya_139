// Check if user is logged in
let loggedInUser = localStorage.getItem('username');

if (!loggedInUser) {
  window.location.href = 'index.html'; // Redirect to registration if not logged in
}

// Create a new post
function createPost() {
  const postContent = document.getElementById('postContent').value;

  const postDiv = document.createElement('div');
  postDiv.classList.add('post');

  const contentParagraph = document.createElement('p');
  contentParagraph.textContent = postContent;
  postDiv.appendChild(contentParagraph);

  // Reactions section
  const reactionsDiv = document.createElement('div');
  reactionsDiv.classList.add('reactions');

  let likes = 0;
  let dislikes = 0;

  // Like button with small icon
  const likeButton = document.createElement('button');
  likeButton.classList.add('small-button');
  likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${likes}`;
  likeButton.onclick = function() {
    likes++;
    likeButton.innerHTML = `<img src="like-icon.png" alt="Like" class="icon"> ${likes}`;
  };

  // Dislike button with small icon
  const dislikeButton = document.createElement('button');
  dislikeButton.classList.add('small-button');
  dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${dislikes}`;
  dislikeButton.onclick = function() {
    dislikes++;
    dislikeButton.innerHTML = `<img src="dislike-icon.png" alt="Dislike" class="icon"> ${dislikes}`;
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

  // Handle comments
  commentButton.onclick = function() {
    const commentText = commentInput.value;
    if (commentText) {
      const commentDiv = document.createElement('p');
      commentDiv.textContent = commentText;
      commentsList.appendChild(commentDiv);
      commentInput.value = ''; // Clear input
    }
  };

  document.getElementById('postContent').value = ''; // Clear post input
}
