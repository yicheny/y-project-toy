// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const {ESBuildPlugin} = require('esbuild-loader')
//
// const swp = new SpeedMeasurePlugin();

module.exports = function (config,dev) {
    // config = swp.wrap(config)
    // config.plugins.push(new ESBuildPlugin());
    // const rules = config.module.rules[2].oneOf;
    // //使用esbuild-loader替换babel-loader
    // rules.splice(2,1,{
    //     test:/\.(js|mjs)$/,
    //     loader:'esbuild-loader',
    //     options:{
    //         loader:"jsx",
    //         target:"es2015"
    //     }
    // })
    return config;
}