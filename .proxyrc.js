const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.swiggy.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": ""
      },
      logger: console
    })
  );
};
