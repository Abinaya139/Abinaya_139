// Function to create a post
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

    const dislikeButton = document.createElement('button');
    dislikeButton.classList.add('dislike-button');
    dislikeButton.innerHTML = '👎 Dislike (0)';
    dislikeButton.dislikesCount = 0; // Initialize dislikes count
    dislikeButton.addEventListener('click', function() {
        this.classList.toggle('disliked');
        if (this.classList.contains('disliked')) {
            this.dislikesCount++;
            this.innerHTML = `👎 Disliked (${this.dislikesCount})`;
        } else {
            this.dislikesCount--;
            this.innerHTML = `👎 Dislike (${this.dislikesCount})`;
        }
    });

    const commentCountDisplay = document.createElement('small');
    commentCountDisplay.textContent = 'Comments (0)';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';

    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comment';
    commentButton.addEventListener('click', function() {
        if (commentInput.value.trim()) {
            const commentList = document.createElement('div');
            commentList.textContent = `${currentUser}: ${commentInput.value.trim()}`;
            postElement.appendChild(commentList);
            commentInput.value = '';

            // Update comment count
            const currentCommentCount = parseInt(commentCountDisplay.textContent.match(/\d+/)[0]) + 1;
            commentCountDisplay.textContent = `Comments (${currentCommentCount})`;
        }
    });

    // Emoji input for comments
    const emojiPicker = document.createElement('input');
    emojiPicker.type = 'text';
    emojiPicker.placeholder = '😀';
    emojiPicker.addEventListener('input', function() {
        commentInput.value += this.value; // Append selected emoji to comment input
        this.value = ''; // Clear emoji input
    });

    postElement.appendChild(postContent);
    postElement.appendChild(postDate);
    postElement.appendChild(postImage);
    postElement.appendChild(likeButton);
    postElement.appendChild(dislikeButton);
    postElement.appendChild(commentCountDisplay);
    postElement.appendChild(commentInput);
    postElement.appendChild(emojiPicker);
    postElement.appendChild(commentButton);

    return postElement;
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const postContent = document.getElementById('postContent').value.trim();
    const postImage = document.getElementById('postImage').files[0];

    if (postContent) {
        const postsContainer = document.getElementById('postsContainer');
        
        const timestamp = new Date().toLocaleString(); // Get current date and time
        const imageSrc = postImage ? URL.createObjectURL(postImage) : null;

        const newPost = createPost(postContent, imageSrc, timestamp);
        postsContainer.prepend(newPost); // Add new post to the top
        document.getElementById('postContent').value = ''; // Clear the textarea
        document.getElementById('postImage').value = ''; // Clear the file input
    }
});
