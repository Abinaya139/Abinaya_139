let loggedInUser = localStorage.getItem('username'); // Get username from localStorage

if (!loggedInUser) {
  window.location.href = 'index.html'; // Redirect to registration if not logged in
}

// Create a new post
function createPost() {
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
    img.style.maxWidth = '100%';
    postDiv.appendChild(img);
  }

  // Add timestamp
  const timestamp = document.createElement('p');
  timestamp.textContent = new Date().toLocaleString();
  postDiv.appendChild(timestamp);

  // Reactions section with emojis
  const reactionsDiv = document.createElement('div');
  reactionsDiv.classList.add('reactions');

  const emojis = [
    { symbol: '👍', name: 'Like' },
    { symbol: '❤️', name: 'Love' },
    { symbol: '😂', name: 'Haha' },
    { symbol: '😢', name: 'Sad' },
    { symbol: '😡', name: 'Angry' }
  ];

  emojis.forEach(emoji => {
    const button = document.createElement('button');
    button.textContent = emoji.symbol + ' ' + emoji.name;
    button.onclick = function() {
      button.classList.toggle('active');
      if (button.classList.contains('active')) {
        button.style.backgroundColor = '#e0e0e0'; // Highlight when active
      } else {
        button.style.backgroundColor = ''; // Reset when inactive
      }
    };
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

  commentButton.onclick = function() {
    const commentText = commentInput.value;
    if (commentText) {
      const commentDiv = document.createElement('p');
      commentDiv.textContent = commentText;
      commentSection.appendChild(commentDiv);
      commentInput.value = ''; // Clear input
    }
  };

  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);
  postDiv.appendChild(commentSection);

  // Show number of comments
  const commentCount = document.createElement('p');
  commentCount.textContent = 'Comments: ' + commentSection.childElementCount;
  commentSection.appendChild(commentCount);
  
  // Update comment count on comment addition
  const updateCommentCount = () => {
    commentCount.textContent = 'Comments: ' + commentSection.childElementCount;
  };

  commentButton.onclick = function() {
    const commentText = commentInput.value;
    if (commentText) {
      const commentDiv = document.createElement('p');
      commentDiv.textContent = commentText;
      commentSection.appendChild(commentDiv);
      commentInput.value = ''; // Clear input
      updateCommentCount(); // Update count after adding comment
    }
  };

  document.getElementById('posts').prepend(postDiv);
  document.getElementById('postContent').value = ''; // Clear post input
  document.getElementById('postImage').value = ''; // Clear image input
}
