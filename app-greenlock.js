// npm install spdy@3.x
const SPDY      = require('spdy')
const Greenlock = require('greenlock-express');

var greenlock = Greenlock.create({
    version: 'draft-11',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    email: 'dacioromero@gmail.com',
    agreeTos: true,
    approveDomains: [ 'dacio.app', 'dacioromero.me' ],
    configDir: '~/.config/acme/',
    app: require('./app'),
    communityMember: false
}).listen(80, 443);

/*
const app = require('./app')

////////////////////////
// http-01 Challenges //
////////////////////////

require('http').createServer(greenlock.middleware(app)).listen(process.env.PORT || 80, function () {
    console.log("Listening for ACME http-01 challenges on", this.address());
});

////////////////////////
// http2 via SPDY h2  //
////////////////////////

if(!process.env.PORT) {
    const spdyOptions = Object.assign({}, greenlock.tlsOptions);
    spdyOptions.spdy = { protocols: [ 'h2', 'http/1.1' ], plain: false };

    const server = SPDY.createServer(spdyOptions, app);

    server.on('error', function (err) {
        console.error(err);
    });

    server.on('listening', function () {
        console.log("Listening for SPDY/http2/https requests on", this.address());
    });

    server.listen(443);
}
*/
