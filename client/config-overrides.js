const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#EE4036',
        '@font-family': '"Source Sans Pro", sans-serif',
      },
    },
  }),
);
