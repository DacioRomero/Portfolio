// app.js

const subdomain = require('express-subdomain');
const express = require('express');

const app = express();
const router = express.Router()

app.engine('handlebars', require('express-handlebars')({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

router.get('/', (req, res) => {
    res.render('home');
});

if (process.env.SUBDOMAIN) {
    console.log(`Hosting on subdomain ${process.env.SUBDOMAIN}`)
    app.use(subdomain(process.env.SUBDOMAIN, router));
}
else {
    app.use(router);
}

if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app
