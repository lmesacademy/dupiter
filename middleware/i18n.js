export default function ({ isHMR, app, route }) {

  const defaultLocale = app.i18n.fallbackLocale

  if (isHMR) { return }

  const locale = route.query.lang || defaultLocale

  app.i18n.locale = locale

}
