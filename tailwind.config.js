/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["./template/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: { jbmono: ["JetBrains Mono", "monospace"] },
        },
    },
    plugins: [],
};
