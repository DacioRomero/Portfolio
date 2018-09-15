// contollers/index.js
const octokit = require('@octokit/rest')();

function indexController(app) {
    app.get('/', (req, res) => {
        res.render('home', { active: 'home' });
    });

    app.get('/about', (req, res) => {
        res.render('about', { active: 'about' });
    });

    app.get('/repos', (req, res) => {
        octokit.repos.getForUser({ username: 'DacioRomero' })
        .then(response => {
            let sortedRepos = response.data.sort((a, b) => {
                return b['stargazers_count'] - a['stargazers_count'];
            });

            res.render('repos', { repos: sortedRepos, active: 'repos' });
        })
        .catch(err => {
            console.log(err)
        });
    });
}

module.exports = indexController;
