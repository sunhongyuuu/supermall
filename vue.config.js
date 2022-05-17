module.exports = {
    configureWebpack: {
        resolve: {
            //省略后缀
            extensions: [],
            //别名
            alias: {
                // '@': 'src'
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                //this.$router和this.$store就可以引用，不需要配置
                'views': '@/views'
            }
        }
    }
}