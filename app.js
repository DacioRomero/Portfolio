// app.js

const express        = require('express');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const marked         = require('marked');

const app = express();

const PostsController = require('./controllers/posts')

// Middleware
// hbs = exphbs.create({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     helpers: {
//         mdToHTML: function (md) { marked(md); },
//         shorten: function (s, n) { return s.slice(n)  }
//     }
// });
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        mdToHTML: marked,
        shorten: (s, n) => { return s.split('\n').slice(0, n).join('\n'); },
        ifOut: (x, y, a, b) => { return x == y ? a : b }
    }
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dacio-app', { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.render('index', { active: 'home' });
});

app.get('/about', (req, res) => {
    res.render('about', { active: 'about' });
});

PostsController(app)

// app.get('/test', (req, res) => {
//     res.render('post', { content: '*test*' } );
// });

if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app
