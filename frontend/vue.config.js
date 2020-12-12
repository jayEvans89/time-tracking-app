module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: "@use '@/styles/global';"
      }
    }
  }
}
