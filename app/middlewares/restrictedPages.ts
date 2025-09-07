export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.underConstruction) {
    if (process.dev) return // allow in dev
    return abortNavigation(
      createError({ statusCode: 404, statusMessage: 'Not Found' })
    )
    // Or: return navigateTo('/')
  }
})