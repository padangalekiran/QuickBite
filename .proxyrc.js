module.exports = function (app) {
  const { createProxyMiddleware } = require("http-proxy-middleware");

  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.swiggy.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": ""
      }
    })
  );
};
