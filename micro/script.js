document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const postContent = document.getElementById('postContent').value;
    const postImage = document.getElementById('postImage').files[0];

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Add text content
    const contentParagraph = document.createElement('p');
    contentParagraph.textContent = postContent;
    postDiv.appendChild(contentParagraph);

    // Add image if it exists
    if (postImage) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(postImage);
        postDiv.appendChild(img);
    }

    // Add reactions section
    const reactionsDiv = document.createElement('div');
    reactionsDiv.classList.add('reactions');

    const likeButton = document.createElement('button');
    likeButton.textContent = '👍 Like (0)';
    let likeCount = 0;
    likeButton.onclick = function() {
        likeCount++;
        likeButton.textContent = `👍 Like (${likeCount})`;
    };

    const dislikeButton = document.createElement('button');
    dislikeButton.textContent = '👎 Dislike (0)';
    let dislikeCount = 0;
    dislikeButton.onclick = function() {
        dislikeCount++;
        dislikeButton.textContent = `👎 Dislike (${dislikeCount})`;
    };

    reactionsDiv.appendChild(likeButton);
    reactionsDiv.appendChild(dislikeButton);
    postDiv.appendChild(reactionsDiv);

    // Add comment section
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    const commentInput = document.createElement('input');
    commentInput.classList.add('comment-input');
    commentInput.placeholder = 'Add a comment...';
    
    const emojiButton = document.createElement('button');
    emojiButton.textContent = '😊';
    emojiButton.onclick = function() {
        commentInput.value += '😊'; // Append emoji to comment input
    };

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
    commentSection.appendChild(emojiButton);
    commentSection.appendChild(commentButton);
    postDiv.appendChild(commentSection);

    // Append the new post to the posts container
    document.getElementById('postsContainer').prepend(postDiv);

    // Clear the form
    document.getElementById('postForm').reset();
});

// View Posts button functionality
document.getElementById('viewPosts').addEventListener('click', function() {
    const posts = document.getElementById('postsContainer').innerHTML;
    const viewPostsWindow = window.open('', '_blank');
    viewPostsWindow.document.write(`
        <html>
            <head><title>Posts</title><link rel="stylesheet" href="style.css"></head>
            <body>
                <h1>All Posts</h1>
                <div>${posts}</div>
                <button onclick="window.close()">Close</button>
            </body>
        </html>
    `);
    viewPostsWindow.document.close();
});
