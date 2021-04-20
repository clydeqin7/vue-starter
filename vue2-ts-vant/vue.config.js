/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const merge = require("webpack-merge");
const tsImportPluginFactory = require("ts-import-plugin");
const autoprefixer = require("autoprefixer");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .tap((options) => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "vant",
                libraryDirectory: "es",
                // 指定样式路径
                style: (name) => `${name}/style/less`,
              }),
            ],
          }),
          compilerOptions: {
            module: "es2015",
          },
        });
        return options;
      });
  },
  css: {
    loaderOptions: {
      postcss: {
        // options here will be passed to postcss-loader
        plugins: [autoprefixer()],
      },
      less: {
        modifyVars: {
          // 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${resolve(
            "./src/assets/styles/theme-var.less"
          )}";`,
        },
      },
    },
  },
};
