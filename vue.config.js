module.exports = {
    devServer: {
        proxy: `${process.env.VUE_APP_API_URL}`
        //clientLogLevel: 'info'
        
    }
};
