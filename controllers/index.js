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
                if(a['stargazers_count'] > b['stargazers_count']) {
                    return -1;
                } else if(a['stargazers_count'] < b['stargazers_count']) {
                    return 1;
                } else {
                    return 0;
                }
            });

            res.render('repos', { repos: sortedRepos, active: 'repos' });
        })
        .catch(err => {
            console.log(err)
        });
    });
}

module.exports = indexController;
