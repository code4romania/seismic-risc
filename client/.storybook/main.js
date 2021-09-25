const custom = require("../config-overrides");

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.js"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      "name": "@storybook/preset-create-react-app",
      "options": {
        "craOverrides": {
          "fileLoaderExcludes": ["less"]
        }
      }
    },
  ],
  webpackFinal: (storybookConfig) => {
    const customConfig = custom(storybookConfig);
    return {
      ...storybookConfig,
      module: { ...storybookConfig.module, rules: customConfig.module.rules },
    };
  }
}
