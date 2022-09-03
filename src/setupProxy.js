const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/walk',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: false,
        })
    );
    app.use(
        '/naver',
        createProxyMiddleware({
            target: 'https://naveropenapi.apigw.ntruss.com',
            changeOrigin: true,
            ws: false,
        })

    );





};