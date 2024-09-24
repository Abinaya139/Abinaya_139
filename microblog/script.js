let loggedIn = false;

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
