(function () {
  var storageKey = 'mg_cookie_consent'
  var consentVersion = '2026-04-18'
  var consentEvent = 'mg:cookie-consent-changed'
  var config = window.MG_SITE_CONFIG || {}
  var rawBaseUrl = typeof config.matomoBaseUrl === 'string' ? config.matomoBaseUrl.trim() : ''
  var baseUrl = rawBaseUrl ? rawBaseUrl.replace(/\/?$/, '/') : ''
  var siteId = typeof config.matomoSiteId === 'string' ? config.matomoSiteId.trim() : ''
  var lastTrackedPage = ''
  var scriptRequested = false

  function readConsent() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(storageKey) || 'null')
      var version = (parsed && (parsed.version || parsed.policyVersion)) || ''
      return version === consentVersion && parsed && parsed.status === 'accepted' ? 'accepted' : 'rejected'
    } catch (_) { return 'rejected' }
  }

  function clearLocalMatomoCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      var name = cookie.split('=')[0].trim()
      if (!/^(_pk_|mtm_consent|mtm_cookie_consent)/.test(name)) return
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    })
  }

  function revokeAnalytics() {
    window.__mgAnalyticsConsentGranted = false
    if (window._paq && typeof window._paq.push === 'function') {
      window._paq.push(['forgetConsentGiven'])
      window._paq.push(['deleteCookies'])
    }
    clearLocalMatomoCookies()
  }

  function trackCurrentPage() {
    if (window.__mgAnalyticsConsentGranted !== true) return
    var url = window.location.origin + window.location.pathname
    var key = url + '|' + document.title
    if (key === lastTrackedPage) return
    lastTrackedPage = key
    var queue = window._paq = window._paq || []
    queue.push(['setCustomUrl', url])
    queue.push(['setDocumentTitle', document.title])
    queue.push(['trackPageView'])
  }

  function loadAnalytics() {
    window.__mgAnalyticsConsentGranted = true
    var queue = window._paq = window._paq || []
    queue.push(['requireConsent'])
    queue.push(['setConsentGiven'])
    if (!scriptRequested) {
      scriptRequested = true
      queue.push(['setTrackerUrl', baseUrl + 'matomo.php'])
      queue.push(['setSiteId', siteId])
      queue.push(['setCookieDomain', 'docs.myglobal.site'])
      queue.push(['setDomains', ['docs.myglobal.site']])
      queue.push(['enableLinkTracking'])
      var script = document.createElement('script')
      script.async = true
      script.src = baseUrl + 'matomo.js'
      document.head.appendChild(script)
    }
    trackCurrentPage()
  }

  window.addEventListener(consentEvent, function (event) {
    if (event && event.detail && event.detail.status === 'accepted') loadAnalytics()
    else revokeAnalytics()
  })
  document.addEventListener('astro:page-load', function () {
    lastTrackedPage = ''
    trackCurrentPage()
  })
  if (baseUrl && siteId && readConsent() === 'accepted') loadAnalytics()
  else revokeAnalytics()
})()
