<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Micro Blogging App - Your Feed</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <h2>Your Feed</h2>
    <textarea id="postContent" placeholder="What's on your mind?" required></textarea>
    <input type="file" id="postImage" accept="image/*">
    <button onclick="createPost()">Post</button>

    <h3>Posts</h3>
    <div id="posts"></div>
  </div>

  <script>
    let loggedInUser = localStorage.getItem('username');

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

      // Reactions section
      const reactionsDiv = document.createElement('div');
      reactionsDiv.classList.add('reactions');

      let likes = 0;
      let dislikes = 0;

      const likeButton = document.createElement('button');
      likeButton.innerHTML = `👍 ${likes}`;
      likeButton.onclick = function() {
        likes++;
        likeButton.innerHTML = `👍 ${likes}`;
      };

      const dislikeButton = document.createElement('button');
      dislikeButton.innerHTML = `👎 ${dislikes}`;
      dislikeButton.onclick = function() {
        dislikes++;
        dislikeButton.innerHTML = `👎 ${dislikes}`;
      };

      reactionsDiv.appendChild(likeButton);
      reactionsDiv.appendChild(dislikeButton);
      
      // Emojis for comments
      const emojiButton = document.createElement('button');
      emojiButton.innerHTML = '😊';
      emojiButton.onclick = function() {
        alert('You clicked the emoji button!'); // Placeholder for emoji functionality
      };
      reactionsDiv.appendChild(emojiButton);

      postDiv.appendChild(reactionsDiv);

      // Comment section
      const commentSection = document.createElement('div');
      commentSection.classList.add('comment-section');

      const commentInput = document.createElement('input');
      commentInput.placeholder = 'Add a comment...';

      const commentButton = document.createElement('button');
      commentButton.textContent = 'Comment';

      const commentsList = document.createElement('div');
      commentSection.appendChild(commentInput);
      commentSection.appendChild(commentButton);
      commentSection.appendChild(commentsList);
      postDiv.appendChild(commentSection);

      // Add comment functionality
      commentButton.onclick = function() {
        const commentText = commentInput.value;
        if (commentText) {
          const commentDiv = document.createElement('p');
          commentDiv.textContent = commentText;
          commentsList.appendChild(commentDiv);
          commentInput.value = ''; // Clear input
        }
      };

      // Show number of comments
      const commentCount = document.createElement('p');
      commentCount.textContent = 'Comments: 0';
      commentSection.appendChild(commentCount);
      
      const updateCommentCount = () => {
        commentCount.textContent = `Comments: ${commentsList.childElementCount}`;
      };

      commentButton.onclick = function() {
        const commentText = commentInput.value;
        if (commentText) {
          const commentDiv = document.createElement('p');
          commentDiv.textContent = commentText;
          commentsList.appendChild(commentDiv);
          commentInput.value = ''; // Clear input
          updateCommentCount(); // Update count after adding comment
        }
      };

      document.getElementById('posts').prepend(postDiv);
      document.getElementById('postContent').value = ''; // Clear post input
      document.getElementById('postImage').value = ''; // Clear image input
    }
  </script>
</body>
</html>
