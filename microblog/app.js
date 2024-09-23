const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const users = [];
const posts = [];

// Helper function to find user by username
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

// Helper function to find post by post ID
function findPostById(postId) {
  return posts.find(post => post.id === postId);
}

// Register a new user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: user_${Date.now()},
    username,
    password,
    following: [],
  };

  users.push(newUser);
  res.json(newUser);
});

// Follow a user by username
app.post('/api/follow', (req, res) => {
  const { followerUsername, followeeUsername } = req.body;
  const follower = findUserByUsername(followerUsername);
  const followee = findUserByUsername(followeeUsername);

  if (!follower || !followee) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!follower.following.includes(followeeUsername)) {
    follower.following.push(followeeUsername);
  }

  res.json({ message: 'Followed successfully' });
});

// Unfollow a user by username
app.post('/api/unfollow', (req, res) => {
  const { followerUsername, followeeUsername } = req.body;
  const follower = findUserByUsername(followerUsername);
  const followee = findUserByUsername(followeeUsername);

  if (!follower || !followee) {
    return res.status(404).json({ message: 'User not found' });
  }

  follower.following = follower.following.filter(username => username !== followeeUsername);
  res.json({ message: 'Unfollowed successfully' });
});

// Create a new post with optional image upload
app.post('/api/posts/create', (req, res) => {
  const { content, authorUsername, imageUrl } = req.body;
  if (!content || !authorUsername) {
    return res.status(400).json({ message: 'Content and author username are required' });
  }

  const newPost = {
    id: post_${Date.now()},
    content,
    authorUsername,
    imageUrl,
    likes: 0,
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.json(newPost);
});

// Like a post
app.post('/api/posts/like', (req, res) => {
  const { postId } = req.body;
  const post = findPostById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.likes += 1;
  res.json({ message: 'Liked post', post });
});

// Get the feed for a user
app.get('/api/posts/feed/:username', (req, res) => {
  const { username } = req.params;
  const user = findUserByUsername(username);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const userFeed = posts.filter(
    post => user.following.includes(post.authorUsername) || post.authorUsername === username
  );
  res.json(userFeed);
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
