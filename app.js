#!/usr/bin/env node

// DEPENDENCIES
const express         = require('express');
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override')
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const marked          = require('marked');
const path            = require('path');

// Middleware
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: {
        mdToHTML: marked,
        shorten: (s, n) => { return s.slice(0, n); },
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
const indexController = require('./controllers/index');
const postsController = require('./controllers/posts');

indexController(app)
postsController(app)

// LISTENER - only if directly run
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
