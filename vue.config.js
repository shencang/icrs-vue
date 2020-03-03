module.exports = {

    configureWebpack:  {
        resolve:{
            alias:{
                "styles":"@assets/styles"
            }
        }
    }, // CSS 相关选项

    devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8443',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            } // string | Object
        // before: app => {}
    }, // 第三方插件配置

    pluginOptions: {
        // ...
    }
};