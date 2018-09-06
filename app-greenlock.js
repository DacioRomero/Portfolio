// app-greenlock.js

'use strict';

require('greenlock-express').create({
    version: 'draft-11',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    email: 'dacioromero@gmail.com',
    agreeTos: true,
    approveDomains: [ 'dacio.app' ],
    configDir: '~/.config/acme/',
    app: require('./app'),
    communityMember: false
}).listen(80, 443);
