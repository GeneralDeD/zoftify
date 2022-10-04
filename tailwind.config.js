/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"background-color": "#F5F5F5",
				"background-secondary": "#F5F6FA",
				"color-secondary": "#667281",
				"gray-line": "DBDBE2",
				"icon-tertiary": "#B2C2DF",
				"primary-blue": "#177EFF",
				"primary-blue-light": "#70AEFD",
				"text-primary": "#111",
			},
			borderRadius: {
				4: "4px",
			},
		},
	},
	plugins: [],
};
