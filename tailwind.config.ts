import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "480px",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "rgb(var(--primary-rgb) / <alpha-value>)",
                    hover: "rgb(var(--primary-rgb) / 0.8)",
                },
                secondary: {
                    DEFAULT: "#ec4899",
                    hover: "#db2777",
                },
                surface: "rgba(255, 255, 255, 0.05)",
                border: "rgba(255, 255, 255, 0.1)",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
