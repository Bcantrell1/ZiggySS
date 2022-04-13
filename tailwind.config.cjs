module.exports = {
	content: ['./src/**/*.{html,css,svelte}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		styled: true,
		themes: ['forest', 'emerald', 'autumn'],
		base: true,
		utils: true
	}
};
