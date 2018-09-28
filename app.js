// DEPENDENCIES
const express         = require('express');
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override')
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const marked          = require('marked');
const path            = require('path');

require('dotenv').config();

// MIDDLEWARE
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: {
        mdToHTML: marked,
        shorten: (s, n) => { return s.slice(0, n); },
        ifOut: (x, y, a, b) => { return x == y ? a : b; },
        sReplace: (str, s, n) => {
            return str.replace(s, n);
        },
    }
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/portfolio', { useNewUrlParser: true });

// ROUTES
const indexController = require('./controllers/index');
// const postsController = require('./controllers/posts');

indexController(app);
// postsController(app);

// LISTENER
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
