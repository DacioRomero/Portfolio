// controllers/posts.js
const Post = require('../models/post')

function PostsController(app) {

    app.get('/posts', (req, res) => {
        Post.find()
        .then(posts => {
            res.render('posts-index', { posts: posts, active: 'blog' });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    app.get('/posts/new', (req, res) => {
        res.render('posts-new');
    });

    // CREATE
    app.post('/posts', (req, res) => {
        Post.create(req.body).then((post) => {
            res.redirect(`/posts/${post._id}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // SHOW
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id).then(post => {
            res.render('posts-show', { post: post, active: 'blog' });
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // EDIT
    app.get('/posts/:id/edit', (req, res) => {
        Post.findById(req.params.id).then(post => {
            res.render('posts-edit', { post: post, active: 'blog' });
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // UPDATE
    app.put('/posts/:id', (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/posts/${review._id}`);
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/posts/:id', (req, res) => {
        Post.findByIdAndRemove(req.params.id)
        .then(review => {
            res.redirect('/posts');
        })
        .catch(err => {
            console.log(err.message);
        })
    });

}

module.exports = PostsController;
