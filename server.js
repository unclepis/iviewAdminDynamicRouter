var restify = require('restify');
var _ = require('lodash');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(restify.pre.sanitizePath());

const menuList = require('./src/data/mock.json')
server.get('/api/menuList', (req, res, next) => {
    res.send(200, menuList);
    return next();
})

server.listen(9999, function () {
    console.log('%s listening at %s', server.name, server.url);
});