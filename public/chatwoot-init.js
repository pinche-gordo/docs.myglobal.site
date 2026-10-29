(function () {
  var config = window.MG_SITE_CONFIG || {}
  var baseUrl = typeof config.chatwootBaseUrl === 'string' ? config.chatwootBaseUrl.replace(/\/$/, '') : ''
  var websiteToken = typeof config.chatwootWebsiteToken === 'string' ? config.chatwootWebsiteToken.trim() : ''
  if (!baseUrl || !websiteToken) return
  var language = (document.documentElement.lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en'
  window.chatwootSettings = { locale: language, useBrowserLanguage: false, darkMode: 'auto' }
  var script = document.createElement('script')
  script.src = baseUrl + '/packs/js/sdk.js'
  script.async = true
  script.defer = true
  script.onload = function () {
    if (window.chatwootSDK) window.chatwootSDK.run({ websiteToken: websiteToken, baseUrl: baseUrl })
  }
  document.head.appendChild(script)
})()
