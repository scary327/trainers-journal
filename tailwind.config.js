/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            black: "#000000",
            white: "#ffffff",
            "blue-dark": "#203064",
            "blue-medium": "#3358D4",
            "blue-light": "#E1E9FF",
            "gray-text": "#AFAFAF",
            "error-red": "#ED4337",
            "success-color": "#5cb85c"
        },
        fontFamily: {
            "inter-regular": [
                "Inter-Regular",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif"
            ],
            "inter-bold": [
                "Inter-Bold",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif"
            ],
            "inter-medium": [
                "Inter-Medium",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif"
            ],
            "inter-light": [
                "Inter-Light",
                "-apple-system",
                "BlinkMacSystemFont",
                "Segoe UI",
                "Roboto",
                "Helvetica Neue",
                "Arial",
                "sans-serif"
            ]
        }
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: "8px"
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#E1E9FF",
                        borderRadius: "20px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#203064",
                        borderRadius: "20px"
                    }
                }
            };
            addUtilities(newUtilities, ["responsive", "hover", "focus"]);
        }
    ]
};
