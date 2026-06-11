const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const db = new sqlite3.Database('./blog.db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.get('/', (req, res) => {
  const userId = req.session.user ? req.session.user.id : null;
  
  if (userId) {
    db.all('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.user_id = ? ORDER BY p.created_at DESC', [userId], (err, myPosts) => {
      if (err) return res.status(500).send(err.message);
      db.all('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC', [], (err, allPosts) => {
        if (err) return res.status(500).send(err.message);
        res.render('index', { myPosts, allPosts });
      });
    });
  } else {
    db.all('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC', [], (err, allPosts) => {
      if (err) return res.status(500).send(err.message);
      res.render('index', { myPosts: [], allPosts });
    });
  }
});

app.get('/post/:id', (req, res) => {
  db.get('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id], (err, post) => {
    if (err) return res.status(500).send(err.message);
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post });
  });
});

app.get('/new', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('new', { post: null });
});

app.post('/posts', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { content } = req.body;
  db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)', [req.session.user.id, content], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.get('/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  db.get('SELECT * FROM posts WHERE id = ? AND user_id = ?', [req.params.id, req.session.user.id], (err, post) => {
    if (err) return res.status(500).send(err.message);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit', { post });
  });
});

app.post('/edit/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  const { content } = req.body;
  db.run('UPDATE posts SET content = ? WHERE id = ? AND user_id = ?', [content, req.params.id, req.session.user.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.post('/delete/:id', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  db.run('DELETE FROM posts WHERE id = ? AND user_id = ?', [req.params.id, req.session.user.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.render('register', { error: 'Username already exists' });
        }
        return res.status(500).send(err.message);
      }
      res.redirect('/login');
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).send(err.message);
    if (!user) return res.render('login', { error: 'Invalid username or password' });
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { error: 'Invalid username or password' });
    
    req.session.user = { id: user.id, username: user.username };
    res.redirect('/');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
