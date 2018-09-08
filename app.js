#!/usr/bin/env node

// DEPENDENCIES
const express         = require('express');
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override')
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const marked          = require('marked');
const path            = require('path');
const PostsController = require('./controllers/posts')


// Middleware
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: {
        mdToHTML: marked,
        shorten: (s, n) => { return s.split('\n').slice(0, n).join('\n'); },
        ifOut: (x, y, a, b) => { return x == y ? a : b; }
    }
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dacio-app', { useNewUrlParser: true });

// ROUTES
app.get('/', (req, res) => {
    res.render('index', { active: 'home' });
});

app.get('/about', (req, res) => {
    res.render('about', { active: 'about' });
});

PostsController(app)

// LISTENER - only if directly run
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
