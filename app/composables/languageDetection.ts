// export const useLanguageDetection = () => {
//   const detectLanguage = () => {
//     // Server-side detection
//     if (import.meta.server) {
//       const nuxtApp = useNuxtApp()
//       const event = nuxtApp.ssrContext?.event
      
//       if (event?.node?.req?.headers?.['accept-language']) {
//         const acceptLanguage = event.node.req.headers['accept-language']
//         const primaryLang = acceptLanguage.split(',')[0].split('-')[0]
//         return primaryLang === 'de' ? 'de-DE' : 'en-US'
//       }
//       return 'en-US'
//     }
    
//     // Client-side detection
//     if (typeof navigator !== 'undefined') {
//       const browserLocale = navigator.language || navigator.languages?.[0] || 'en-US'
//       return browserLocale.startsWith('de') ? 'de-DE' : 'en-US'
//     }
    
//     return 'en-US'
//   }
  
//   return { detectLanguage }
// }

interface LanguageDetectionComposable {
  detectLanguage: () => string;
}

export const useLanguageDetection = (): LanguageDetectionComposable => {
  const detectLanguage = (): string => {
    // Server-side detection
    if (import.meta.server) {
      const nuxtApp = useNuxtApp()
      const event = nuxtApp.ssrContext?.event
      
      if (event?.node?.req?.headers?.['accept-language']) {
        const acceptLanguage = event.node.req.headers['accept-language']
        const primaryLang = acceptLanguage.split(',')[0]?.split('-')[0]
        return primaryLang === 'de' ? 'de-DE' : 'en-US'
      }
      return 'en-US'
    }
    
    // Client-side detection
    if (typeof navigator !== 'undefined') {
      const browserLocale = navigator.language || navigator.languages?.[0] || 'en-US'
      return browserLocale.startsWith('de') ? 'de-DE' : 'en-US'
    }
    
    return 'en-US'
  }
  
  return { detectLanguage }
}