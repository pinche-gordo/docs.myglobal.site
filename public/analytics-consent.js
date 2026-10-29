(function () {
  var storageKey = 'mg_cookie_consent'
  var consentVersion = '2026-04-18'
  var consentEvent = 'mg:cookie-consent-changed'
  var bannerId = 'myglobal-analytics-consent'
  var settingsId = 'myglobal-analytics-settings'
  var isSpanish = (document.documentElement.lang || 'en').toLowerCase().startsWith('es')

  function getStatus() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(storageKey) || 'null')
      var version = parsed && (parsed.version || parsed.policyVersion)
      return version === consentVersion && (parsed.status === 'accepted' || parsed.status === 'rejected') ? parsed.status : 'pending'
    } catch (_) { return 'pending' }
  }

  function save(status) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ status: status, version: consentVersion, at: new Date().toISOString() }))
    } catch (_) { return }
    window.dispatchEvent(new CustomEvent(consentEvent, { detail: { status: status } }))
    render()
  }

  function button(label, action) {
    var element = document.createElement('button')
    element.type = 'button'
    element.textContent = label
    element.addEventListener('click', action)
    return element
  }

  function render() {
    var existingBanner = document.getElementById(bannerId)
    var existingSettings = document.getElementById(settingsId)
    if (existingBanner) existingBanner.remove()
    if (existingSettings) existingSettings.remove()
    if (getStatus() === 'pending') {
      var banner = document.createElement('section')
      banner.id = bannerId
      banner.setAttribute('role', 'dialog')
      banner.setAttribute('aria-live', 'polite')
      banner.setAttribute('aria-label', isSpanish ? 'Preferencias de analítica' : 'Analytics preferences')
      var message = document.createElement('p')
      message.textContent = isSpanish
        ? 'Usamos analítica opcional para entender cómo se consulta esta guía. Puedes aceptar o rechazarla.'
        : 'We use optional analytics to understand how people use this guide. You can accept or reject it.'
      banner.appendChild(message)
      var actions = document.createElement('div')
      actions.appendChild(button(isSpanish ? 'Aceptar analítica' : 'Accept analytics', function () { save('accepted') }))
      actions.appendChild(button(isSpanish ? 'Rechazar' : 'Reject', function () { save('rejected') }))
      banner.appendChild(actions)
      document.body.appendChild(banner)
    }
    var settings = button(isSpanish ? 'Privacidad' : 'Privacy', function () {
      try { window.localStorage.removeItem(storageKey) } catch (_) {}
      window.dispatchEvent(new CustomEvent(consentEvent, { detail: { status: 'pending' } }))
      render()
    })
    settings.id = settingsId
    settings.setAttribute('aria-label', isSpanish ? 'Cambiar preferencias de analítica' : 'Change analytics preferences')
    document.body.appendChild(settings)
  }

  var style = document.createElement('style')
  style.textContent = '#' + bannerId + '{position:fixed;z-index:9998;left:1rem;right:1rem;bottom:1rem;max-width:42rem;margin:auto;padding:1rem;border:1px solid #64748b;border-radius:.75rem;background:#0f172a;color:#f8fafc;box-shadow:0 10px 30px #0006;font:inherit}#' + bannerId + ' p{margin:0 0 .75rem}#' + bannerId + ' div{display:flex;gap:.75rem;flex-wrap:wrap}#' + bannerId + ' button,#' + settingsId + '{font:inherit;cursor:pointer;border:1px solid #94a3b8;border-radius:.5rem;background:#1e293b;color:#fff;padding:.5rem .75rem}#' + bannerId + ' button:focus-visible,#' + settingsId + ':focus-visible{outline:3px solid #38bdf8;outline-offset:2px}#' + settingsId + '{position:fixed;z-index:9997;left:1rem;bottom:1rem}'
  document.head.appendChild(style)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true })
  else render()
})()
