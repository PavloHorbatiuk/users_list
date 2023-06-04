/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,html,css}'],
	theme: {
		extend: {
			colors: {
				primary: '#F4E041',
				secondary: '#00BDD3',
				bg: '#F8F8F8',
				hover: '#FFE302',
				lightGrey:"#E5E5E5",
				grey:"#D0CFCF",
				radio:"#00BDD3"
			},
			fontFamily: {
				sans: ['Nunito', 'sans-serif'],
				serif: ['NunitoAsap', 'serif'],
			},
			backgroundImage: {
				'hero-pattern': "url('/src/images/hero.png')",
			},
		},
	},
	plugins: [],
};
