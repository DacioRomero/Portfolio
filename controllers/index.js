// contollers/index.js

function indexController(app) {
    app.get('/', (req, res) => {
        res.render('index', { active: 'home' });
    });

    app.get('/about', (req, res) => {
        res.render('about', { active: 'about' });
    });
}

module.exports = indexController
