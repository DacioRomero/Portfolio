// app.js

const express = require('express');
const exphbs  = require('express-handlebars');
const marked  = require('marked');

const app = express();
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: { marked: marked }
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/test', (req, res) => {
    res.render('page', { content: '*test*' } );
});

if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app
