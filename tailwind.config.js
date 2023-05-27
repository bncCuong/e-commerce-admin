/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {},
        animation: {
            movetop: 'movetop 1s ease-in-out forwards  ',
        },
        screens: {
            mb: '438px',
            sm: '580px',
            md: '668px',
            lg: '1084px',
            xl: '1280px',
        },
        keyframes: {
            movetop: {
                from: { opacity: 0.5, transform: 'translateY(50%)' },

                to: { opacity: 1, transfrom: 'translateY(100%)' },
            },
        },
    },
    plugins: [],
};
