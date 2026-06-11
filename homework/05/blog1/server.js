const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./blog.db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.get('/', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY created_at DESC', [], (err, posts) => {
    if (err) return res.status(500).send(err.message);
    res.render('index', { posts });
  });
});

app.get('/post/:id', (req, res) => {
  db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, post) => {
    if (err) return res.status(500).send(err.message);
    if (!post) return res.status(404).send('Post not found');
    res.render('post', { post });
  });
});

app.get('/new', (req, res) => {
  res.render('new', { post: null });
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

app.get('/edit/:id', (req, res) => {
  db.get('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, post) => {
    if (err) return res.status(500).send(err.message);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit', { post });
  });
});

app.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect(`/post/${req.params.id}`);
  });
});

app.post('/delete/:id', (req, res) => {
  db.run('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
