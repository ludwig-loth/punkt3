module.exports = {
    content: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            fontSize: {
                'headings-1': '2.25rem',
                'headings-2': '1.875rem',
            },
            fontWeight: {
                'headings-1': '700',
                'headings-2': '600',
            },
        },
    },
    plugins: [],
}