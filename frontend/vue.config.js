module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => config.optimization.minimize(false),

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
      includeLocales: false,
      enableBridge: true
    }
  }
}
