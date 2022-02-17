const path = require('path');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5000/graphql',
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@material-ui/x-license'] = path.join(__dirname, 'src/lib/x-license/index.js');

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // Important: return the modified config
    return config;
  },
};
