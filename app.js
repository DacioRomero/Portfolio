var Express = require('express');
var ExHbs   = require('express-handlebars');

var app = Express();
app.engine('handlebars', ExHbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('port', 3000)

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
