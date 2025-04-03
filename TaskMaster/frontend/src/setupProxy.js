const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    '/api',
        createProxyMiddleware({
            target: 'https://localhost:5245',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
            '^/api': ''
            }
        })
    );
};