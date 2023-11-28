module.exports = (context, options) => {
  return {
    name: 'symlink-resolver',
    configureWebpack(config, isServer, utils, content) {
      return {
        resolve: {
          symlinks: false,
        },
      };
    },
  };
}

