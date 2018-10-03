// DEPENDENCIES
const express         = require('express');
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override')
const mongoose        = require('mongoose');
const bodyParser      = require('body-parser');
const path            = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

// MIDDLEWARE
const app = express();

const myHelpers = {
    shorten: (s, n) => { return s.slice(0, n); },
    fromNow: date => { return require(path.join(__dirname, '/public/js/moment.min.js'))(date).fromNow() }
}

app.engine('hbs', exphbs({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main',
    helpers: Object.assign(myHelpers, require('handlebars-helpers')(['string', 'comparison', 'markdown', 'date']),),
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/portfolio', { useNewUrlParser: true });

// ROUTES
require('./controllers/index')(app);
// require('./controllers/posts')(app);

// LISTENER
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
