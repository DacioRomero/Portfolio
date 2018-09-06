// app.js

const app = require('express')();
app.engine('handlebars', require('express-handlebars')({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});

if (require.main === module) {
    let port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app
