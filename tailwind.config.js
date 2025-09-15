module.exports = {
    content: [
        './app/components/**/*.{vue,js,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './nuxt.config.{js,ts}',
    ],
    darkMode: 'class',
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