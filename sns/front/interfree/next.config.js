const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({
  compress: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/allPostsBoard",
        permanent: true,
      },
    ];
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]clocale$/, /^\.\/ko$/),
      ],
    };
  },
});
